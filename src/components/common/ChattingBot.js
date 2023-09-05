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
  return (

    <></>



    // <div className={`modal fade ${true ? 'show' : ''}`} id="basicModal" tabIndex="-1" aria-hidden="true">
    //   <div className="modal-dialog modal-dialog-centered" role="document">
    //     <div className="modal-content">

    //     </div>
    //   </div>
    // </div>


    // <div class="modal" tabIndex="-1">
    //   <div class="modal-dialog">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title">Modal title</h5>
    //         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //       </div>
    //       <div class="modal-body">
    //         <p>Modal body text goes here.</p>
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>



    // <div className='modal modal-dialog-centered d-flex align-items-center justify-content-center' data-bs-dismiss="modal">
    //   <div className='' data-bs-toggle="modal" data-bs-dismiss="modal">
    //     <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
    //     <ThemeProvider theme={theme}>
    //       <ChatBot steps={steps} className='mx-auto' />
    //     </ThemeProvider>
    //   </div>
    // </div>

    // <div className='modal modal-dialog-centered d-flex align-items-center justify-content-center' >
    //   <div className='' data-bs-toggle="modal" data-bs-dismiss="modal">
    //     <ThemeProvider theme={theme}>
    //       <ChatBot steps={steps} className='mx-auto' />
    //     </ThemeProvider>
    //   </div>
    // </div>
  );
}

export default ChattingBot;