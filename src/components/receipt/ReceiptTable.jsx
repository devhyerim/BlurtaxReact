import React, { useState } from "react";
import ModalMemo from "./ModalMemo";
import axios from "axios";

function ReceiptTable({ receipts }) {
  console.log("receipts: ", receipts);
  const [selectedStatus, setSelectedStatus] = useState({});
  // select 태그에서 옵션을 선택했을 때 호출되는 함수
  const handleStatusChange = (id, newStatus) => {
    setSelectedStatus((prevSelectedStatus) => ({
      ...prevSelectedStatus,
      [id]: newStatus,
    }));
    // PATCH 요청을 보낼 URL과 데이터를 정의
    const url = `http://localhost:3001/receipts/${id}`;
    const data = { status: newStatus };
    // Axios를 사용하여 PATCH 요청
    axios
      .patch(url, data)
      .then((response) => {
        console.log(`ID ${id}의 상태가 변경되었습니다.`);
      })
      .catch((error) => {
        console.error(`ID ${id}의 상태 변경 중 오류 발생:`, error);
      });
  };
  return (
    <tbody id="searchResults">
      {receipts.map((receipt) => {
        return (
          <tr key={receipt.id}>
            <td>
              <input className="selectRadiobtn form-check-input" type="radio" />
              <span hidden className="recreqno">
                {receipt.id}
              </span>
            </td>
            <td>{receipt.purpose}</td>
            <td>
              <select
                className="judge form-select"
                onChange={(e) => handleStatusChange(receipt.id, e.target.value)}
                value={selectedStatus[receipt.id] || receipt.status}
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
