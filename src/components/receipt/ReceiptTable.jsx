import React, { useState } from "react";
import ModalMemo from "./ModalMemo";
import axios from "axios";

function ReceiptTable({ receipts }) {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [radioChecked, setRadioChecked] = useState(false);
  // select 태그에서 옵션을 선택했을 때 호출되는 함수
  const handleStatusChange = (recreqno, newStatus) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [recreqno]: newStatus,
    }));
    // PATCH 요청을 보낼 URL과 데이터를 정의
    const url = `http://localhost:3001/receipts/${recreqno}`;
    const data = { status: newStatus };
    // Axios를 사용하여 PATCH 요청
    axios
      .patch(url, data)
      .then((response) => {
        console.log(`ID ${recreqno}의 상태가 변경되었습니다.`);
      })
      .catch((error) => {
        console.error(`ID ${recreqno}의 상태 변경 중 오류 발생:`, error);
      });
  };
  const handleRadioClick = (recreqno) => {
    setRadioChecked((prevState) => ({
      ...prevState,
      [recreqno]: !prevState[recreqno], // 라디오 버튼 체크 상태를 토글
    }));
  };

  return (
    <tbody id="searchResults">
      {receipts
        .filter((receipt) => receipt.confirmed.confirmedno === null)
        .map((receipt) => {
          return (
            <tr key={receipt.recreqno}>
              <td>
                <input className="form-check-input" type="radio" />
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
                  value={selectedStatus[receipt.recreqno]}
                >
                  <option defaultValue="미증빙">미증빙</option>
                  <option value="적합">적합</option>
                  <option value="부적합">부적합</option>
                </select>
              </td>
              <td>
                <input type="text" className="contents form-control" />
              </td>
              <td>
                <ModalMemo memo={receipt.memo} />
              </td>
            </tr>
          );
        })}
    </tbody>
  );
}

export default ReceiptTable;
