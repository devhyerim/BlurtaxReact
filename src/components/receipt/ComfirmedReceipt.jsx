import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import ModalMemo from "./ModalMemo";
import ModalSlip from "./ModalSlip";
import ConfiredCollapse from "./ConfiredCollapse";
import ModalAccount from "../common/ModalAccount";
import axios from "axios";

function ComfirmedReceipt({ receipt }) {
  console.log("confirmed receipt: ", receipt);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  // 모달 표시 여부
  const [showModal, setShowModal] = useState(false);

  // 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = (account) => {
    setShowModal(false);
    // 모달이 닫힐 때 선택된 계정 정보 전달
    setSelectedAccount(account);
  };

  const handleStatusChange = (receiptId = 1) => {
    // axios.patch 요청을 보내서 해당 영수증의 status를 변경
    axios
      .patch(`http://localhost:3001/receipts/${receiptId}`, {
        status: "부적합", // 변경하려는 status 값
      })
      .then((res) => {
        // 요청이 성공하면 적절한 처리를 수행
        console.log(`Receipt ${receiptId}의 상태가 부적합으로 변경되었습니다.`);
        // 여기서 상태를 업데이트하거나 필요한 작업을 수행할 수 있습니다.
      })
      .catch((error) => {
        // 요청이 실패한 경우 에러 처리
        console.error(`상태 변경에 실패했습니다: ${error}`);
      });
  };

  return (
    <div>
      <div className="listcondition">
        <div className="line">
          <label htmlFor="inputDate" className="col-form-label labeltitle">
            수신 일시
          </label>
          <div className="line">
            <input type="date" id="startdate" className="form-control" />
            ~&nbsp;
            <input type="date" id="enddate" className="form-control" />
          </div>
        </div>
        <div className="listconditionbtn">
          <button type="button" className="btn btn-outline-dark">
            전체
          </button>
          <button type="button" className="btn btn-outline-primary">
            반영
          </button>
          <button type="button" className="btn btn-outline-danger">
            미반영
          </button>
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" className="th-first tabletop">
              No.
            </th>
            <th scope="col" className="tabletop">
              거래일자
            </th>
            <th scope="col" className="tabletop">
              구분
            </th>
            <th scope="col" className="tabletop">
              유형
            </th>
            <th scope="col" className="tabletop">
              거래처
            </th>
            <th scope="col" className="tabletop">
              적요
            </th>
            <th scope="col" className="tabletop">
              공급가액
            </th>
            <th scope="col" className="tabletop">
              세액
            </th>
            <th scope="col" className="tabletop">
              합계
            </th>
            <th scope="col" className="tabletop">
              메모
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="form-check-input"
                type="checkbox"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
              />
              <span hidden className="recreqno"></span>
              <span hidden className="confirmedNo"></span>
            </td>
            <td>
              <input type=" text" className="regdate form-control" />
            </td>
            <td>
              <select className="typecheck form-select">
                <option value="일반">일반</option>
                <option value="매입">매입</option>
              </select>
            </td>
            <td></td>
            <td>
              <input type="text" className="bcnc form-control" />
            </td>
            <td className="summary"></td>
            <td>
              <input type="text" className="amount form-control" />
            </td>
            <td></td>
            <td></td>
            <td>
              <ModalMemo />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" className="th-first tabletop">
              No.
            </th>
            <th scope="col" className="tabletop">
              거래처
            </th>
            <th scope="col" className="tabletop">
              구분
            </th>
            <th scope="col" className="tabletop" colSpan="2">
              적요
            </th>
            <th scope="col" className="tabletop" colSpan="2">
              <button
                type="button"
                className="accountCheck btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#accountCode"
                onClick={() => openModal()}
              >
                계정과목 <i className="bi bi-info-circle"></i>
                {
                  // 모달 상태에 따라 모달 렌더링
                  showModal && (
                    <ModalAccount
                      openModal={openModal}
                      closeModal={closeModal}
                      setSelectedAccount={setSelectedAccount}
                    />
                  )
                }
              </button>
            </th>
            <th scope="col" className=" tabletop">
              차변(출금)
            </th>
            <th scope="col" className="tabletop">
              대변(입금)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input className="form-check-input " type="checkbox" />
              <span hidden className="b_recreqno"></span>
            </td>
            <td className="b_bcnc"></td>
            <td className="b_typecheck"></td>
            <td colSpan="2" className="b_summary"></td>
            <td className="b_accountCodeNo"></td>
            <td className="b_accountCodeName"></td>
            <td className="amount"></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <ConfiredCollapse open={open}>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => handleStatusChange(receipt.receiptId)}
        >
          부적합으로 변경
        </button>
        <ModalSlip />
      </ConfiredCollapse>
    </div>
  );
}

export default ComfirmedReceipt;
