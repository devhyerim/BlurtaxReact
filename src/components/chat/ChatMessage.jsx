import React, { useState, useEffect } from "react";
import "../../resources/assets/css/Chat.css";
function ChatMessage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8081/websocket");

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
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = () => {
    socket.send(message);
    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 기본 동작 방지 (새 줄 추가 방지)
      sendMessage();
    }
  };
  return (
    <div className="chat-container">
      {/* <span>메세지</span> */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <div className="input-group mb-3">
        <button class="btn btn-outline-secondary" type="button">
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
      <input type="file" class="form-control" />
    </div>
  );
}

export default ChatMessage;
