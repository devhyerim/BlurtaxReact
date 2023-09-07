import COHeader from '../../components/common/COHeader';
import ChatBotButton from '../../components/common/ChatBotButton';
import HomeCOBody from '../../components/home/HomeCOBody';
import '../../resources/assets/css/HomeCO.css';
import React, { useState } from 'react';

const HomeCO = () => {
    const [chatBotOnOff, setChatBotOnOff] = useState(false);


    return (
        <>
            <div>
                <COHeader></COHeader>
            </div>
            <div id="main" style={{marginLeft: "0px"}}>
                <HomeCOBody></HomeCOBody>
                <ChatBotButton></ChatBotButton>
            </div>
        </>
    );
}



export default HomeCO