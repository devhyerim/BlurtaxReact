import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlipDetailTable from "./SlipDetailTable";
import ModalAccount from "../common/ModalAccount";
import { update } from "lodash";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { setSlips } from '../../redux/bankSlice';

const ModifySlip = () => {
  const dispatch = useDispatch();

  //--------------- 전표입력, 분개내역 조회 관련 -----------------
  const { control, handleSubmit } = useForm();
  const { fields, append, prepend, swap, move, insert } = useFieldArray({
    control,
    name: "modifySlip"
  });

  // 사용자가 선택한 은행 내역, 전표 내역, 무엇을 선택했는지
  const banks = useSelector((state)=> state.bank.banks);
  const slips = useSelector((state)=> state.bank.slips);
  const [detailSlips, setDetailSlips] = useState([]);

  // 선택한 은행의 bhno로 분개내역 조회
  const showBankDetail = () => {
    // Banks 배열에서 bhno 속성만 추출해 새로운 배열 생성
    const bhnoList = banks.map((bank)=>bank.bhno).join(',');

    axios.get(`http://localhost:8081/bank/detailslip?bhno=${bhnoList}`)
          .then((res)=>{
            setDetailSlips(res.data);
          });
  }

  useEffect(()=>{
    showBankDetail();
  }, [banks]); // 사용자가 선택한 bank가 바뀔 때마다 렌더링

    //------------------ 계정코드 모달 관련 ----------------------------
  // 모달을 오픈한 버튼 인덱스
  const [index, setIndex] = useState(0);

  // 모달창에서 클릭한 계정 객체
  const [selectedAccount, setSelectedAccount] = useState([]);

  // 모달 표시 여부
	const [showModal, setShowModal] = useState(false);

  // 모달 열기
	const openModal = () => {
		setShowModal(true);
	}

	// 모달 닫기
	const closeModal = (account, index) => {
		setShowModal(false);

    // 모달이 닫힐 때 선택된 계정 정보 전달
    const newAccount = account;
    const updatedSelectedAccount = [...selectedAccount];
    // 기존 selectedAccount 배열 복사 후 새로운 정보를 index에 추가
    updatedSelectedAccount[index] = newAccount;
    setSelectedAccount(updatedSelectedAccount);
	}

  // 클릭한 버튼으로 인덱스 변경
  const changeIndex = (buttonIndex) => {
    setIndex(buttonIndex);
  }
  
  //---------------------------------------------------------

  if(banks === undefined || slips === undefined){
    return <div>Loading...</div>;
  }

  return(
    <div>
      <SlipDetailTable>
        {
          detailSlips.map((slip, index)=>{
            return(
              <tr key={index}>
                <input type="hidden" value={slip.bankslipno}/>
                <td>
                  <select 
                    className="form-select" 
                    name="sortno" 
                    aria-label="Default select example"
                  >
                    <option value="1" selected={slip.sortno==="1"}>입금</option>
                    <option value="2" selected={slip.sortno==="2"}>출금</option>
                    <option value="3" selected={slip.sortno==="3"}>차변</option>
                    <option value="4" selected={slip.sortno==="4"}>대변</option>
                  </select>
                </td>
                <td className="button-and-input">
                  <button
                    type="button"
                    className="btn searchaccount btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-atrget="#accountCode"
                    onClick={()=>openModal()}
                  >
                    <i class="ri-article-fill"></i>
                  </button>
                  <input 
                    type="text" 
                    className="intable" 
                    value={slip.accountno}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    className="intable" 
                    value={slip.accountname}
                  />
                </td>
                <td className={slip.sortno==="3" ? "" : "cantwrite"}>
                  <input 
                    type="text" 
                    value={slip.sortno==="3" ?
                      slip.amount.toLocaleString().toString().replace('-', '')
                      : ""} 
                    className={slip.sortno==="3" ? "intable" : "intable cantwrite"}
                    readOnly={slip.sortno!=="3"}
                  />
                </td>
                <td className={slip.sortno==="4" ? "" : "cantwrite"}>
                  <input 
                    type="text" 
                    value={slip.sortno==="4" ?
                      slip.amount.toLocaleString().toString().replace('-', '')
                      : ""} 
                    className={slip.sortno==="4" ? "intable" : "intable cantwrite"}
                    readOnly={slip.sortno!=="4"}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={slip.source} 
                    className="intable" 
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={slip.summary} 
                    className="intable"
                  />
                </td>
              </tr>
            );
          })
        }
      </SlipDetailTable>
      <button 
        type="button" 
        className="btn btn-primary btnmarginright" 
        id="modifyslipbtn"
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
    </div>
  );
}

export default ModifySlip;