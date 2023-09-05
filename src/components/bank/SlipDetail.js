import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlipDetailTable from "./SlipDetailTable";
import ModalAccount from "../common/ModalAccount";
import { update } from "lodash";
import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { setSlips } from '../../redux/bankSlice';
import WriteSlip from "./WriteSlip";
import ModifySlip from "./ModifySlip";

const SlipDetail = () => {
  const dispatch = useDispatch();

  //--------------- 전표입력, 분개내역 조회 관련 -----------------
  
  // 사용자가 선택한 은행 내역, 전표 내역, 무엇을 선택했는지
  const banks = useSelector((state)=> state.bank.banks);
  const slips = useSelector((state)=> state.bank.slips);
  const requestWhat = useSelector((state)=> state.bank.requestWhat);

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

  // 선택한 은행의 기본 정보 불러와서 분개내역 입력
  const writeBankDetail = () => {
    setDetailSlips(banks);
  }

  useEffect(()=>{
    if(requestWhat==="show"){
      showBankDetail();
    }
    if(requestWhat==="write"){
      writeBankDetail();
    }
  }, [requestWhat, banks]);   // 요청 사항이 있을 때마다 리렌더링



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

  //---------------------------------------------------------

  if(banks === undefined || slips === undefined){
    return <div>Loading...</div>;
  }

  return(
    <div>
      { requestWhat==="write" &&
        <WriteSlip/>
      }
      { requestWhat==="show" &&
        <ModifySlip/>
      }
      { requestWhat==="" && 
        <SlipDetailTable>
        {  <>
            <tr>
              <td>
                  <select className="form-select" name="sortno" aria-label="Default select example">
                    <option value="1">입금</option>
                    <option value="2">출금</option>
                    <option value="3" selected>차변</option>
                    <option value="4">대변</option>
                  </select>
              </td>
              <td className="button-and-input">
                <button
                  type="button"
                  className="btn searchaccount btn-outline-dark"
                >
                  <i class="ri-article-fill"></i>
                </button>
                <input type="text" className="intable" readOnly/>
              </td>
              <td>
                <input type="text" className="intable" readOnly/>
              </td>
              <td>
                <input type="text" className="intable" readOnly/>
              </td>
              <td className="cantwrite"><input type="text" className="intable cantwrite" readOnly/></td>
              <td><input type="text" className="intable" readOnly/></td>
              <td><input type="text" className="intable" readOnly/></td>
            </tr>
            <tr>
              <td>
                  <select className="form-select" name="sortno" aria-label="Default select example">
                  <option value="1">입금</option>
                  <option value="2">출금</option>
                  <option value="3">차변</option>
                  <option value="4" selected>대변</option>
                  </select>
              </td>
              <td className="button-and-input">
                <button
                  type="button"
                  className="btn searchaccount btn-outline-dark"
                >
                  <i class="ri-article-fill"></i>
                </button>
                <input type="text" className="intable" readOnly/>
              </td>
              <td>
                <input type="text" name="accountname" className="intable" readOnly/>
              </td>
              <td className="cantwrite"><input type="text" name="amount" className="intable cantwrite" readOnly/></td>
              <td>
                <input type="text" className="intable" readOnly/>
              </td>
              <td><input type="text" className="intable" readOnly/></td>
              <td><input type="text" name="summary" className="intable" readOnly/></td>
            </tr>
          </>
        }
        </SlipDetailTable>
      }
      { // 모달 상태에 따라 모달 렌더링
				showModal &&
				<ModalAccount
					openModal={openModal} 
					closeModal={closeModal}
          setSelectedAccount={setSelectedAccount}
          index={index}
				/>
			}

    </div>
  );
}

export default SlipDetail;