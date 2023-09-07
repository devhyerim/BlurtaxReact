import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import { ThemeProvider } from "styled-components";

const ChatFloatingButton = () => {
  const [chatOnOff, setChatOnOff] = useState(false);
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#4169E1",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#4169E1",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };
  return (
    <div>
      {/* 채팅 버튼 */}
      <a
        class={`rsc-float-button sc-fjdhpX ${chatOnOff ? "cDkpCQ" : "godhbL1"}`}
        onClick={() => setChatOnOff((chatOnOff) => !chatOnOff)}
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

      {/* 챗봇창 */}
      <div
        class={`rsc-container sc-iwsKbI ${chatOnOff ? "hgftJd" : "losXwd"}`}
        width="400px"
        height="520px"
      >
        <div class="rsc-header sc-gqjmRU glfuN bg-transparent">
          <a
            class="rsc-header-close-button sc-jTzLTM kMqZix"
            onClick={() => setChatOnOff((chatOnOff) => !chatOnOff)}
          >
            <svg
              className="me-2"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </a>
        </div>
        <ThemeProvider theme={theme}>
          <ChatMessage />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ChatFloatingButton;
