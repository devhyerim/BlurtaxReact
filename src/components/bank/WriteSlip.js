import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlipDetailTable from "./SlipDetailTable";
import ModalAccount from "../common/ModalAccount";
import { update } from "lodash";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { setWholeBanks, setWholeSlips, setNumber, setRequestWhat } from '../../redux/bankSlice';


const WriteSlip = () => {
  const dispatch = useDispatch();
  const bizno = useSelector((state)=> state.bank.selectedBizno);
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);

  //--------------- 전표입력, 분개내역 조회 -----------------
  const { control, handleSubmit, register, getValues, reset } = useForm();
  const { fields, append, prepend,
         swap, move, insert, remove } = useFieldArray({
    control,
    name: "insertSlip"
  });

  // 사용자가 선택한 은행 내역, 전표 내역, 무엇을 선택했는지
  const banks = useSelector((state)=> state.bank.banks);
  const slips = useSelector((state)=> state.bank.slips);
 
  const [detailSlips, setDetailSlips] = useState([]);

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

  // 선택한 은행의 bhno로 은행 내역 기본 불러오기
  const showBankDetail = () => {
    // Banks 배열에서 bhno 속성만 추출해 새로운 배열 생성
    const bhnoList = banks.map((bank)=>bank.bhno).join(',');

    console.log(bhnoList);

    axios.get(`http://localhost:8081/bank/writebankhistory?bhno=${bhnoList}`)
          .then((res)=>{
            setDetailSlips(res.data);
          });

    //console.log(detailSlips);
  }

  useEffect(()=>{
    showBankDetail();
  }, [banks]); // 사용자가 선택한 bank가 바뀔 때마다 렌더링


  // detailSlips 배열의 수 * 2 만큼 필드를 추가
  useEffect(() => {
    console.log(detailSlips);
    if (detailSlips.length > fields.length) {
      // detailSlips의 길이가 fields보다 길 때, 필드를 추가
      for (let i = fields.length; i < detailSlips.length; i++) {
        append(detailSlips[i]);
      }
    } else if (detailSlips.length < fields.length) {
      // detailSlips의 길이가 fields보다 짧을 때, 필드를 제거
      for (let i = fields.length - 1; i >= detailSlips.length; i--) {
        remove(i);
      }
    }
  }, [detailSlips, fields]);

  // 전표 등록 요청
  const onSubmit = () => {
    const formData = getValues("insertSlip");
    
    console.log(formData);

    axios.post('http://localhost:8081/bank/insertdetailslips', formData)
    .then(()=>{
      alert("전표 입력이 완료되었습니다.");
      getAllBanksAndSlips();    // 다시 통장, 전표 내역 불러오기
      dispatch(setRequestWhat(""));
      setDetailSlips([]);       // 초기화
      //dispatch(setBanks([]));   // 선택한 은행내역 초기화
    });
  }

  //------------------ 계정코드 모달 관련 ----------------------------
  // 모달을 호출한 행 인덱스
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // 모달창에서 클릭한 계정 객체
  const [selectedAccount, setSelectedAccount] = useState([]);

  // 모달 표시 여부
  const [showModal, setShowModal] = useState(false);

  // 모달 열기
  const openModal = (index) => {
    setSelectedRowIndex(index);
    setShowModal(true);
  }

  // 모달 닫기
  const closeModal = (accountno, accountname) => {
    setShowModal(false);

    if(selectedRowIndex!==null){
      
      // 선택한 행의 인덱스를 이용하여 해당 행의 데이터를 업데이트
      const updatedSelectedAccount = [...selectedAccount]; // 기존 배열 복사
      const rowIndex = selectedRowIndex; // 선택한 행의 인덱스

      // 배열의 길이를 선택한 행의 인덱스보다 크게 만들기
      while (updatedSelectedAccount.length <= rowIndex) {
        updatedSelectedAccount.push({});
      }

      // 선택한 행의 인덱스에 데이터 설정
      updatedSelectedAccount[rowIndex] = {
        accountno: accountno,
        accountname: accountname,
      };

      // 선택한 행의 데이터 업데이트
      setSelectedAccount(updatedSelectedAccount);

      console.log(selectedAccount);
    }
  }

  //---------------------------------------------------------

  if(banks === undefined || slips === undefined){
    return <div>Loading...</div>;
  }

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <SlipDetailTable>
        { 
          detailSlips && fields.map((item, index)=>{

            const slip = detailSlips[index];

            return(
              <tr key={item.id}>
                <input 
                  type="hidden" 
                  value={slip && slip.bhno}
                  {...register(`insertSlip[${index}].bhno`)}
                />
                <input 
                  type="hidden" 
                  value={slip && slip.amount}
                  {...register(`insertSlip[${index}].amount`)}
                />
                <td>
                    <select 
                      className="form-select" 
                      {...register(`insertSlip[${index}].sortno`)}
                    >
                      <option value="1">입금</option>
                      <option value="2">차변</option>
                      <option value="3" selected={slip.sortno === 3}>차변</option>
                      <option value="4" selected={slip.sortno === 4}>대변</option>
                    </select>
                    
                </td>
                <td className="button-and-input">
                  <button
                    type="button"
                    className="btn searchaccount btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-atrget="#accountCode"
                    onClick={()=>openModal(index)}
                  >
                    <i class="ri-article-fill"></i>
                  </button>
                  <input 
                    type="text" 
                    className="intable" 
                    name="accountno"
                    value={selectedAccount[index] 
                      ? selectedAccount[index].accountno : ''}
                    {...register(`insertSlip[${index}].accountno`)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="intable"
                    name="accountname"
                    value={selectedAccount[index] 
                      ? selectedAccount[index].accountname : ''}
                    {...register(`insertSlip[${index}].accountname`)}
                  />
                </td>
                <td className={slip.sortno==="3" ? "" : "cantwrite"}>
                  <input 
                    type="text"
                    defaultValue={slip && slip.sortno==="3" ?
                      slip.amount.toLocaleString().toString().replace('-', '')
                      : ""} 
                    className={slip.sortno==="3" ? "intable" : "intable cantwrite"}
                    readOnly={slip.sortno==="3" ? "false" : "true"}
                  />
                </td>
                <td className={slip.sortno!=="3" ? "" : "cantwrite"}>
                  <input 
                    type="text"
                    defaultValue={slip && slip.sortno!=="3" ? 
                      slip.amount.toLocaleString().toString().replace('-', '')
                      : ""} 
                    className={slip.sortno!=="3" ? "intable" : "intable cantwrite"}
                    readOnly={slip.sortno!=="3" ? "false" : "true"}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="source" 
                    defaultValue={slip && slip.source} 
                    {...register(`insertSlip[${index}].source`)}
                    className="intable" 
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="summary" 
                    className="intable"
                    {...register(`insertSlip[${index}].summary`)}
                  />
                </td>
              </tr>
            );
          })
        }
      </SlipDetailTable>
      <button 
        type="submit" 
        className="btn btn-primary btnmarginright" 
        id="writeslipbtn"
      >
        저장
      </button>
      <button 
        type="button" 
        className="btn btn-outline-secondary" 
        id="resetbtn"
      >
        취소
      </button>
      </form>
      { // 모달 상태에 따라 모달 렌더링
				showModal &&
				<ModalAccount
					openModal={openModal} 
					closeModal={closeModal}
				/>
			}
    </div>
  );
}

export default WriteSlip;