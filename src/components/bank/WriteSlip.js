import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlipDetailTable from "./SlipDetailTable";
import ModalAccount from "../common/ModalAccount";
import { update } from "lodash";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { setSlips } from '../../redux/bankSlice';

const WriteSlip = () => {
  const dispatch = useDispatch();

  //--------------- 전표입력, 분개내역 조회 관련 -----------------
  const { control, register } = useForm();
  const { fields, append, prepend, swap, move, insert } = useFieldArray({
    control,
    name: "modifySlip"
  });

  // 사용자가 선택한 은행 내역, 전표 내역, 무엇을 선택했는지
  const banks = useSelector((state)=> state.bank.banks);
  const slips = useSelector((state)=> state.bank.slips);
 
  const [detailSlips, setDetailSlips] = useState([]);

  // 선택한 은행의 기본 정보 불러와서 분개내역 입력
  const writeBankDetail = () => {
    setDetailSlips(banks);
  }

  useEffect(()=>{
    writeBankDetail();
  }, [banks]);   // 요청 사항이 있을 때마다 리렌더링

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
        { // 배열 복제 후 두 번 반복
          detailSlips.flatMap((slip, index) => {
            let sortno = "3";

            return Array(2).fill().map((_, subIndex) => {
              // subIndex가 1일 때(두 번째 반복) sortno를 4로 변경
              if (subIndex === 1) {
                sortno = "4";
              }

              return(
                <tr key={`${index}_${subIndex}`}>
                  <td>
                      <select className="form-select" name="sortno" aria-label="Default select example">
                        <option value="1" selected={sortno==="1"}>입금</option>
                        <option value="2" selected={sortno==="2"}>출금</option>
                        <option value="3" selected={sortno==="3"}>차변</option>
                        <option value="4" selected={sortno==="4"}>대변</option>
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
                      name="accountno"
                      value={selectedAccount ? selectedAccount.accountno : ''} 
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="intable"
                      name="accountname"
                      value={selectedAccount ? selectedAccount.accountname : ''}/>
                  </td>
                  <td className={sortno==="3" ? "" : "cantwrite"}>
                    <input 
                      type="text"
                      value={sortno==="3" ? 
                        slip.amount.toLocaleString().toString().replace('-', '')
                        : ""} 
                      className={sortno==="3" ? "intable" : "intable cantwrite"}
                      readOnly={sortno==="3" ? "false" : "true"}
                    />
                  </td>
                  <td className={sortno!=="3" ? "" : "cantwrite"}>
                    <input 
                      type="text"
                      value={sortno!=="3" ? 
                        slip.amount.toLocaleString().toString().replace('-', '')
                        : ""} 
                      className={sortno!=="3" ? "intable" : "intable cantwrite"}
                      readOnly={sortno!=="3" ? "false" : "true"}
                    />
                  </td>
                  <td><input type="text" name="source" value={slip.source} className="intable" /></td>
                  <td><input type="text" name="summary" className="intable"/></td>
                </tr>
              );
            });
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

export default WriteSlip;