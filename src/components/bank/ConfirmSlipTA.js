import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWholeBanks, setWholeSlips, setNumber } from '../../redux/bankSlice';


const ConfirmSlipTA = ({triggerNextStep}) => {
  const [canSlip, setCanSlip] = useState([]);
  const [memo, setMemo] = useState('');
  const [bhno, setBhno] = useState('');

  const dispatch = useDispatch();
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);

  const link = "";

  let params = {
    bizno: "10001",
    bankname: "신한은행",
    startdate: startDate,
    enddate: endDate
  }

  useEffect(()=>{
    axios.get('http://localhost:8081/bank/getcanslip').then((res)=>{
      setCanSlip(res.data);
    });
  }, []);

  useEffect(()=>{
    canSlip.map((slip)=>{
      setMemo(slip.memo);
      setBhno(slip.bhno);
    });
  }, [canSlip]);

  const getAllBanksAndSlips = () => {
    axios.post(link, params)
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
  

  const confirmSlip = () => {
    const requestBody = [
      {
        bhno: bhno,
        bhstateno: '1002'
      }
    ]

    axios.post('http://localhost:8081/bank/modifySlipState', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }})
    .then((res) => {
      link = res.data.href;
      getAllBanksAndSlips();
    });
  }

  return(
    <div>
      <h3 style={{textAlign: 'center'}}><strong>미확인전표</strong></h3>
      <br/>
      <span>수임사 입력 메모: <strong>{memo}</strong></span><br/><br/>
      <span>신한은행</span>
      <table className="comfirmsliptable table-bordered">
          <thead>
              <tr>
              <th scope="col" className="tabletop" style={{width: '30px'}}>
                  구분
              </th>
              <th scope="col" className="tabletop">
                  계정과목
              </th>
              <th scope="col" className="tabletop">
                  차변
              </th>
              <th scope="col" className="tabletop">
                  대변
              </th>
              <th scope="col" className="tabletop">
                  거래처
              </th>
              </tr>
          </thead>
          <tbody>
            {
              canSlip && canSlip.map((slip)=>{
                return(
                  <tr>
                    <td>
                      <input 
                        type="text" 
                        className="intable" 
                        value={slip.sortno==='3' ? '차변' : '대변'} 
                        readOnly
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="intable" 
                        value={slip.accountname}
                        readOnly
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className={slip.sortno==='3' ? 'intable' : 'intable cantwrite'} 
                        value={slip.sortno==='3' 
                        ? slip.amount.toLocaleString('en-US').replace('-', '') 
                        : ' '} 
                        readOnly
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className={slip.sortno!=='3' ? 'intable' : 'intable cantwrite'} 
                        value={slip.sortno!=='3' 
                        ? slip.amount.toLocaleString('en-US').replace('-', '')  
                        : ' '} 
                        readOnly
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="intable" 
                        value={slip.source}
                        readOnly
                      />
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
      </table>
      <button
          type="button"
          className="btn btn-sm mt-2 me-1 btn-primary"
          onClick={()=>{
            triggerNextStep({ trigger: '7' });
            confirmSlip();
          }}
        >
          확정
      </button>
      <button
          type="button"
          className="btn btn-sm mt-2 btn-secondary"
          onClick={()=>{
            triggerNextStep({ trigger: '3' });
          }}
        >
          뒤로가기
      </button>
    </div>
  );
}

export default ConfirmSlipTA;