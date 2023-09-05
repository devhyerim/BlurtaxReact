import React, { useState, useEffect, useRef } from "react";
import "../../resources/assets/css/Chat.css";
import axios from "axios";
import FileCollapse from "./FileCollapse";
function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const chatMessagesRef = useRef(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [userno, setUserno] = useState("");
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);

  const openWebSocket = () => {
    if (userno) {
      const newSocket = new WebSocket(
        `ws://localhost:8081/websocket/${userno}`
      );

      newSocket.onopen = () => {
        console.log("Server connected!");
      };

      newSocket.onerror = (error) => {
        console.log(error);
      };

      newSocket.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };

      setSocket(newSocket);

      axios.get("http://localhost:8081/chat").then((res) => {
        console.log(res.data);
      });
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  };

  useEffect(() => {
    // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
    console.log(uploadFiles);
  }, [messages, uploadFiles]);

  const sendMessage = () => {
    socket.send(message);
    setMessage("");
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // 파일선택창에서 선택한 파일들

    // 선택한 파일들을 기존 파일 배열에 추가
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };
  const sendFile = () => {
    if (userno === "") {
      alert("로그인을 먼저하세요!!");
    } else {
      // 파일을 서버로 전송하는 로직을 구현
      // 예를 들어, FormData를 사용하여 파일을 전송할 수 있습니다.
      const formData = new FormData();
      uploadFiles.forEach((file) => {
        // 파일 데이터 저장
        formData.append("multipartFiles", file);
      });
      const dataToPost = {
        userno,
      };
      axios
        .post("http://localhost:8081/chat/uploadFiles", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더 설정
          },
          params: dataToPost, // 기타 데이터는 URL 매개변수로 보낼 수 있습니다.
        })
        .then((res) => {
          alert("등록이 완료되었습니다!");
          console.log("파일 등록");
          setUploadFiles([]);
          console.log(res.data);
          sendMessage(res.data);
        })
        .catch((error) => {
          console.error("POST 요청 실패:", error);
        });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 기본 동작 방지 (새 줄 추가 방지)
      sendMessage();
    }
  };
  const handleLoginKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setUserno(e.target.value);
      console.log(e.target.value);
      openWebSocket();
    }
  };
  const handleLoginBtnClick = (e) => {
    setUserno(e.target.value);
    console.log(e.target.value);
    openWebSocket();
  };
  return (
    <div className="chat-container">
      <div className="input-group mb-3">
        <input
          type="text"
          placeholder="로그인하세요."
          className="form-control"
          aria-describedby="button-addon2"
          value={userno}
          onChange={(e) => setUserno(e.target.value)}
          onKeyDown={handleLoginKeyDown}
        />
        <button
          id="button-addon2"
          type="button"
          value={userno}
          className="sendBtn btn btn-outline-secondary"
          onClick={handleLoginBtnClick}
        ></button>
      </div>
      {/* <span>메세지</span> */}
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-group mb-3">
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={() => setOpen(!open)}
        >
          +
        </button>
        <input
          type="text"
          placeholder="보낼 메세지를 입력하세요."
          className="form-control"
          aria-describedby="button-addon2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="button-addon2"
          type="button"
          value="전송"
          className="sendBtn btn btn-outline-secondary"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
      <FileCollapse open={open}>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            multiple
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={sendFile}
          >
            파일 전송
          </button>
        </div>
      </FileCollapse>
    </div>
  );
}

export default ChatMessage;
