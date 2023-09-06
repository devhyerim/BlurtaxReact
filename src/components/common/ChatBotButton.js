import React, { useState } from "react";
import ChatBotComponent from "./ChatBotComponent";
import ReqMemoCO from "../bank/ReqMemoCO";

const ChatBotButton = () => {
  const [chatBotOnOff, setChatBotOnOff] = useState(false);
  const [chatOnOff, setChatOnOff] = useState(false);

  let steps = [
    {
      id: "1",
      message: "세무사님이 통장의 내용 확인을 요청했습니다.",
      trigger: "2",
    },
    {
      id: "2",
      component: <ReqMemoCO />,
    },
    {
      id: "3",
      message: "메모가 전달되었습니다!",
      end: true,
    },
  ];

  // 챗봇 열기/닫기 토글 핸들러
  const toggleChatBot = () => {
    setChatBotOnOff((prev) => !prev);
  };

  // 채팅창 열기/닫기 토글 핸들러
  const toggleChatWindow = () => {
    setChatOnOff((prev) => !prev);
  };

  return (
    <div>
      {/* 챗봇버튼 */}
      <a
        class={`rsc-float-button sc-fjdhpX ${chatOnOff ? "cDkpCQ" : "godhbL1"}`}
        onClick={toggleChatWindow}
      >
        <svg
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </a>
      <a
        class={`rsc-float-button sc-fjdhpX ${
          chatBotOnOff ? "cDkpCQ" : "godhbL2"
        }`}
        onClick={toggleChatBot}
      >
        <img
          class="rsc-ts-image sc-gzVnrw cwuCQv"
          src="data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e"
          alt="avatar"
        ></img>
      </a>
      {/* 챗봇창 */}
      <div
        class={`rsc-container sc-iwsKbI ${chatBotOnOff ? "hgftJd" : "losXwd"}`}
        width="350px"
        height="520px"
      >
        <div class="rsc-header sc-gqjmRU glfuN">
          <a class="rsc-header-close-button sc-jTzLTM kMqZix">
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setChatBotOnOff((chatBotOnOff) => !chatBotOnOff)}
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </a>
        </div>
        <ChatBotComponent steps={steps} />
      </div>
      {/* {채팅창} */}
      <div
        class={`rsc-container sc-iwsKbI ${chatBotOnOff ? "hgftJd" : "losXwd"}`}
        width="350px"
        height="520px"
      >
        <div class="rsc-header sc-gqjmRU glfuN">
          <a class="rsc-header-close-button sc-jTzLTM kMqZix">
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setChatOnOff((chatBotOnOff) => !chatBotOnOff)}
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </a>
        </div>
        <ChatBotComponent steps={steps} />
      </div>
    </div>
  );
};

export default ChatBotButton;