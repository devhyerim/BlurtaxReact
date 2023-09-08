import 'react-tooltip/dist/react-tooltip.css'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setWholeBanks, setWholeSlips, setBanks, setNumber, setRequestWhat } from '../../redux/bankSlice';
import axios from 'axios';

// 파라미터로 bankslip 데이터와 사용자가 클릭한 탭(=상태명) 정보를 받아서
// 출력할 때 상태가 탭 정보와 일치하는 bankslip만 출력한다.
const BankSlipTable = ({slips, activeTab, requestFrom}) => {

  // 사용자가 체크한 전표 내역
	const [selectedSlips, setSelectedSlips] = useState([]);

  // 선택한 탭에 따라서 일반전표 구분
  let filteredSlips = null;

  if(activeTab==='canslip'){
      filteredSlips = slips.filter((slip)=>slip.bhstatename==='확정가능');
  }else if(activeTab==='confirmslip'){
      filteredSlips = slips.filter((slip)=>slip.bhstatename==='확정');
  }else if(activeTab==='exceptslip'){
      filteredSlips = slips.filter((slip)=>slip.bhstatename==='제외');
  }else if(activeTab==='removeslip'){
      filteredSlips = slips.filter((slip)=>slip.bhstatename==='삭제');
  }else{
      filteredSlips = slips;
  }

  // 전체 잔액, 차액
  let gettotalsum = useSelector((state)=>state.bank.total.totalsum);
  let getdiffsum = useSelector((state)=>state.bank.total.diffsum);
  let totalSum = null;
  let diffSum = null;

  if(gettotalsum){
    totalSum = gettotalsum.toLocaleString('en-US');
  }
  if(getdiffsum){
    diffSum = getdiffsum.toLocaleString('en-US');
  }

  // 전체 체크 여부
	const [checkAll, setCheckAll] = useState(false);

  // 리덕스 함수 사용 위한 dispatch 생성
	const dispatch = useDispatch();

  // 분개내역조회 클릭 시 선택한 전표 내역 리덕스로 넘겨주기
	const showSlipDetail = () => {
    dispatch(setRequestWhat("show"));
    dispatch(setBanks(selectedSlips));
	}

  // 전체 체크 -> 탭 변경시 false 초기화
	useEffect(()=>{
		setCheckAll(false);
	}, [activeTab]);

	// 전체 체크or해제 시 전표 내역 변경
	const handleCheckAllChange = () => {
		setCheckAll(!checkAll);
	}

	//-> checkAll 변경할 때마다 SelectedBanks 변경
	useEffect(()=>{
		if(checkAll){
			setSelectedSlips(filteredSlips);
		}else{
			setSelectedSlips([]);
		}
	}, [checkAll]);

  // 체크박스 체크or해제
	const handleCheckChange = (slip) => {
		if(selectedSlips.includes(slip)){
			// 사용자가 체크해서 넣은 은행내역이라면 빼기
			setSelectedSlips(selectedSlips.filter((selected)=>selected!==slip));
		}else{
			setSelectedSlips([...selectedSlips, slip]);
		}
	}

  // 전표 상태변경 --------------------------------------------
  const bizno = useSelector((state)=> state.bank.selectedBizno);
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);

  
  let params = {
    bizno: bizno,
    bankname: "신한은행",
    startdate: startDate,
    enddate: endDate
  }

  let link = "";

  const getAllBanksAndSlips = () => {
    // {params}로 쓰면 오류..
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

  const changeState = (param) => {
    const requestBody = selectedSlips.map((slip) => ({
      bhno: slip.bhno,
      bhstateno: param
    }));

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
          <table id="banksliptableAll" className="banksliptable table table-hover table-bordered">
              <thead>
                  <tr>
                    <th scope="col" className="tabletop">
                      <input 
                        className="form-check-input" 
                        type={requestFrom==='ta' ? 'checkbox' : 'hidden'}
                        checked={checkAll}
                        onChange={()=>handleCheckAllChange()}
                      />
                    </th>
                    <th scope="col" className="tabletop">
                      거래처명
                    </th>
                    <th scope="col" className="tabletop">
                      상대계정
                    </th>
                    <th scope="col" className="tabletop">
                      상태
                    </th>
                    <th scope="col" className="tabletop">
                      예상잔액
                    </th>
                    <th scope="col" className="tabletop">
                      전표적요
                    </th>
                  </tr>
                  </thead>
              <tbody>
                  { filteredSlips &&
                    filteredSlips.map((slip)=>{
                      let formattedSum = slip.sum.toLocaleString('en-US');

                      return(
                          <tr key={slip.bhno}>
                              <td>
                                  <input 
                                    className="form-check-input" 
                                    type={requestFrom==='ta' ? 'checkbox' : 'hidden'}
                                    {...(checkAll ? {checked:"checked"} : "")}
                                    onChange={()=>handleCheckChange(slip)}
                                  />
                              </td>
                              <td>{slip.source}</td>
                              <td>{slip.accountname}</td>
                              <td style={{ color: slip.bhstatename === '확정가능' ? '#198754' 
                              : slip.bhstatename === '확정' ? '#4169E1' 
                              : slip.bhstatename === '제외' ? '#ffab00' 
                              : 'inherit' }}>
                                  {slip.bhstatename}
                              </td>
                              <td>{formattedSum}</td>
                              <td>{slip.summary}</td>
                          </tr>
                      )
                  })
                }
                  <tr>
                      <td className="total"></td>
                      <td className="total"><strong>합계</strong></td>
                      <td className="total" colspan="4">
                          잔액: {totalSum}&nbsp;&nbsp;&nbsp;&nbsp;
                          <span style={{color: "red"}}>차액: {diffSum}</span>
                      </td>
                  </tr>
              </tbody>
          </table>

          { (requestFrom==='ta' && activeTab==='allslip') && 
              <button 
                type="button"
                id="detailslipshow" 
                className="btn btn-light btnmarginright"
                onClick={()=>showSlipDetail()}
              >
                  분개내역조회
              </button> }
          { (requestFrom==='ta' && activeTab==='canslip') &&
              <div>
                  <button 
                    type="button" 
                    id="certainslip" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>changeState("1002")}
                  >확정</button>
                  <button 
                    type="button" 
                    id="detailslipshow" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>showSlipDetail()}
                  >분개내역조회</button>
                  <button 
                    type="button" 
                    id="exceptslip" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>changeState("1004")}
                  >제외</button>
                  <button 
                    type="button" 
                    id="removeslip" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>changeState("1005")}
                  >삭제</button>
              </div> }
          { (requestFrom==='ta' && activeTab==='confirmslip') &&
              <div>
                  <button 
                    type="button" 
                    id="cancelcertainslip"
                    className="btn btn-light btnmarginright"
                    onClick={()=>changeState("1001")}
                  >확정취소</button>
                  <button 
                    type="button" 
                    id="detailslipshow" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>showSlipDetail()}  
                  >분개내역조회</button>
              </div> }
          { (requestFrom==='ta' && activeTab==='exceptslip') &&
              <div>
                  <button 
                    type="button" 
                    id="cancelexceptslip" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>changeState("1001")}
                  >제외취소</button>
                  <button 
                    type="button" 
                    id="detailslipshow" 
                    className="btn btn-light btnmarginright"
                    onClick={()=>showSlipDetail()}
                  >분개내역조회</button>
              </div> }
          { (requestFrom==='ta' && activeTab==='removeslip') &&
          <div>
              <button 
                type="button" 
                id="cancelremoveslip" 
                className="btn btn-light btnmarginright"
                onClick={()=>changeState("1001")}
              >삭제취소</button>
              <button 
                type="button" 
                id="detailslipshow" 
                className="btn btn-light btnmarginright"
                onClick={()=>showSlipDetail()}
              >분개내역조회</button>
          </div> }
      </div>
  );
}

export default BankSlipTable;