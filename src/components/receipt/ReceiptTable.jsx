import React, { useEffect, useState } from "react";
import ModalMemo from "./ModalMemo";
import axios from "axios";
import { Form } from "react-bootstrap";

function ReceiptTable({ receipts, onRadioChange }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [contents, setContents] = useState("");
  //Radio버튼 선택시
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    // console.log("radio button selected :" + value);
    onRadioChange(value);
  };

  const handleContents = (e) => {
    setContents(e.target.value);
  };

  // select 태그에서 옵션을 선택했을 때 호출되는 함수
  const handleStatusChange = (recreqno, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [recreqno]: newStatus });
    console.log("recreqno : " + recreqno);
    console.log("newStatus : " + newStatus);
    console.log("contents" + contents);
    const FormData = {
      recreqno,
      contents,
    };
    if (newStatus === "적합") {
      axios
        .post("http://localhost:8081/receipt/confirmedReceipt", FormData)
        .then(() => {
          alert("증빙을 완료해주세요!!");
        });
    }
    if (newStatus === "부적합") {
      if (contents == "") {
        alert("부적합 사유를 먼저 입력하세요!!!");
      } else {
        axios
          .post("http://localhost:8081/receipt/unconfirmedReceipt", FormData)
          .then((res) => {
            console.log(res.data);
          });
      }
    }
  };

  return (
    <table className="receiptTable table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col" className="th-first tabletop">
            No.
          </th>
          <th scope="col" className="tabletop">
            증빙내용
          </th>
          <th scope="col" className="tabletop">
            적합여부
          </th>
          <th scope="col" className="tabletop">
            부적합사유
          </th>
          <th scope="col" className="tabletop">
            메모
          </th>
        </tr>
      </thead>
      <tbody id="searchResults">
        {receipts
          .filter(
            (receipt) =>
              receipt.confirmed.confirmedno === null &&
              receipt.unconfirmed.ucrno === null
          )
          .map((receipt) => {
            return (
              <tr key={receipt.recreqno}>
                <td>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={receipt.recreqno}
                    checked={selectedRadio === receipt.recreqno}
                    onChange={() => handleRadioChange(receipt.recreqno)}
                  />
                  <span hidden className="recreqno">
                    {receipt.recreqno}
                  </span>
                </td>
                <td>{receipt.purpose}</td>
                <td>
                  <select
                    className="judge form-select"
                    onChange={(e) =>
                      handleStatusChange(receipt.recreqno, e.target.value)
                    }
                    value={selectedStatus[receipt.recreqno] || "미증빙"}
                  >
                    <option defaultValue="미증빙">미증빙</option>
                    <option value="적합">적합</option>
                    <option value="부적합">부적합</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="contents form-control"
                    onChange={handleContents}
                  />
                </td>
                <td>
                  <ModalMemo memo={receipt.memo} />
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default ReceiptTable;
