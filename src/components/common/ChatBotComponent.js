import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#4169E1',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#4169E1',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatBotComponent = ({steps}) => {
 
  return(
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps}/>
    </ThemeProvider>
  );
}

export default ChatBotComponent;