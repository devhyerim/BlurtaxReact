import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot'


const theme = {
    background: 'white',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#4169e1',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#4169e1',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const steps = [
    {
      id: '1',
      message: '하이요',
      end: true,
    },
  ];


const ChattingBot = () => {
    return(
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
        </ThemeProvider>
   );
}

export default ChattingBot;