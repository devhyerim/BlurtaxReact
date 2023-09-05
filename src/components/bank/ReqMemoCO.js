import React, { useState, useEffect } from 'react';
import axios from "axios";

const ReqMemoCO = ({triggerNextStep}) => {
  // 요청 통장내역
  const [message, setMessage] = useState([]);

  // 화면에 보여줄 내용
  const [bhno, setBhno] = useState('');
  const [bhdate, setBhDate] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  // 수임사 입력한 메모
  const [memo, setMemo] = useState('');

  // 요청 통장내역 내용 가져오기
  const getMessage = () => {
    // 4-> receiver (로그인한 수임사)
    axios.get(`http://localhost:8081/bank/getMessageList?receiver=4`)
        .then((res)=>{
          console.log(res);
          setBhno(res.data.bhno);
          setMessage(res.data.message);
        });

    console.log("@@@@@@@@통장내역번호: " + bhno); 

    if(bhno!==''){
      axios.get(`http://localhost:8081/bank/detailslip?bhno=${bhno}`)
        .then((res)=>{
            setBhDate(res.data.bhdate);
            setAmount(res.data.amount);
            setSource(res.data.source);

            console.log("@@@@@@@@날짜: " + bhdate);
            console.log("@@@@@@@@금액: " + amount);
            console.log("@@@@@@@@거래처" + source);
        });
    }

    // 저장된 메시지에서 bhno 가져와서 은행 상세 내역 보여주기
    /*
    message.map((message)=>{
      const mbhno = message.bhno;
      setBhno(message.bhno);

      
    });
    */
  }

  useEffect(()=>{
    getMessage();
  }, []);

  // 메모 저장
  const saveMemo = () => {
    axios.get(`http://localhost:8081/bank/sendMemo?bhno=${bhno}&amount=${amount}&memo=${memo}`);
  }

  return(
    <div className="reqMemoCO">
       <h3 style={{textAlign: "center"}}><strong>통장 거래 내역</strong></h3>
       <br/>
       <table>
          <tr>
            <td className="modalintitle">은행</td>
            <td>
              <input 
                type="text" 
                className="intable"
                value="신한은행"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="modalintitle">일자</td>
            <td>
              <input 
                type="text" 
                className="intable"
                value={bhdate}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="modalintitle">내용</td>
            <td>
              <input 
                type="text" 
                className="intable"
                value={source}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td className="modalintitle">금액</td>
            <td>
              <input 
                type="text" 
                className="intable"
                value={amount}
                readOnly
              />
            </td>
          </tr>
          <tr>
          <strong>{message}</strong>
          </tr>
      </table>
      <br/>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="text"
          id="message"
          className="modaltext"
          placeholder="내용을 입력해주세요."
          value={memo}
          onChange={(e)=>{setMemo(e.target.value);}}
          style={{width: "220px", marginRight: "5px"}}
        />
        <button
          type="button"
          className="btn btn-primary"
          id="sendmessagebtn"
          onClick={()=>{
            triggerNextStep({ trigger: '3' });
            saveMemo();
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ReqMemoCO;