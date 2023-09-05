import { useSelector, useDispatch } from 'react-redux';
import { setStartDate, setEndDate, setWholeBanks, setWholeSlips, setNumber } from '../../redux/bankSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BankSearch = ({requestFrom}) => {
  const dispatch = useDispatch();
  const tabizno = useSelector((state)=> state.bank.selectedBizno);
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);
  let bizno = null;

  if(requestFrom==='ta'){
    bizno = tabizno;
  }else{
    bizno = '10001';
  }
  
  let params = {
    bizno: bizno,
    bankname: "신한은행",
    startdate: startDate,
    enddate: endDate
  }

  const getAllBanksAndSlips = () => {
    // {params}로 쓰면 오류..
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

  useEffect(()=>{
    
  }, []);

  return(
      <div>
          <div className="listcondition">
              <div className="line">
                  <label for="inputDate" className="col-form-label labeltitle">일자</label>
                  <div className="line">
                      <input 
                        type="date" 
                        className="form-control"
                        onChange={(e)=>{
                          dispatch(setStartDate(e.target.value));
                        }}
                      />
                      ~&nbsp;
                      <input 
                        type="date" 
                        className="form-control"
                        onChange={(e)=>{
                          dispatch(setEndDate(e.target.value));
                        }}
                      />
                  </div>
              </div>
              <div className="line">
                  <label className="labeltitle">은행&nbsp;&nbsp;</label>
                  <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      전체거래처
                  </button>
                  <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="javascript:void(0);">국민은행</a></li>
                      <li><a className="dropdown-item" href="javascript:void(0);">우리은행</a></li>
                      <li><a className="dropdown-item" href="javascript:void(0);">농협은행</a></li>
                      <li><a className="dropdown-item" href="javascript:void(0);">SC제일은행</a></li>
                      <li><a className="dropdown-item" href="javascript:void(0);">KEB하나은행</a></li>
                  </ul>
              </div>
              <div className="line">
                  <label className="labeltitle">조회내용&nbsp;&nbsp;</label>
                  <div className="line">
                      <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                          <label className="form-check-label" for="gridRadios1">
                              전체
                          </label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                          <label className="form-check-label" for="gridRadios2">
                              입금
                          </label>
                      </div>
                      <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios" value="option"/>
                          <label className="form-check-label" for="gridRadios3">
                              출금
                          </label>
                      </div>
                  </div>
              </div>
              <div className="listconditionbtn">
                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={getAllBanksAndSlips}
                  >조회</button>
              </div>
          </div>
      </div>
  );
}

export default BankSearch;