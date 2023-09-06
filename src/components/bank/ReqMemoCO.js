import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWholeBanks, setWholeSlips, setNumber } from '../../redux/bankSlice';


const ReqMemoCO = ({triggerNextStep}) => {
  // 요청 통장내역
  const [messageList, setMessageList] = useState([]);

  // 화면에 보여줄 내용
  const [bhno, setBhno] = useState('');
  const [bhdate, setBhDate] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [message, setMessage] = useState('');

  // 수임사 입력한 메모
  const [memo, setMemo] = useState('');

  // 요청 통장내역 내용 가져오기
  const getMessage = () => {
    console.log(messageList);

    if(messageList!==null){
      messageList.map((bank)=>{
        let formattedAmount = bank.amount.toLocaleString('en-US');
        let formattedDate = new Intl.DateTimeFormat('en-US', {
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(bank.bhdate)).replace(/\//g, '-');
        setBhno(bank.bhno);
        setAmount(formattedAmount);
        setBhDate(formattedDate);
        setSource(bank.source);
        setMessage(bank.message);
      });
    }
  }

  useEffect(()=>{
    axios.get('http://localhost:8081/bank/getMessageList?receiver=4')
    .then((res)=>{
      setMessageList(res.data);
    });
  }, []);

  // 중요. messageList에 값이 axios로 가져와져야 그 다음 실행
  useEffect(()=>{
    getMessage();
  }, [messageList]);
  
  const dispatch = useDispatch();
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);

  let params = {
    bizno: "10001",
    bankname: "신한은행",
    startdate: startDate,
    enddate: endDate
  }

  // 메모 저장
  const saveMemo = () => {
    axios.get(`http://localhost:8081/bank/sendMemo?bhno=${bhno}&amount=${amount}&memo=${memo}&messageno=10001`);
  
    // 수임사 화면 리렌더링
    axios.post('http://localhost:8081/bank/getHistoryAndSlip', params)
      .then((res) => {
        dispatch(setWholeBanks(res.data.historyList));
        dispatch(setWholeSlips(res.data.slipList));
        dispatch(setNumber({
          "all": res.data.all,
          "can": res.data.can,
          "confirmed": res.data.confirmed,
          "except": res.data.except,
          "remove": res.data.remove,
          "total": res.data.total
        }));
    });
  }

  return(
    <div className="reqMemoCO">
       <h3 style={{textAlign: 'center'}}><strong>통장 거래 내역</strong></h3>
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
      </table>
      <br/>
      <strong>{message}</strong>
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