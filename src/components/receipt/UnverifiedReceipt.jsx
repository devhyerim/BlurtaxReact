import axios from "axios";
import React, { useEffect, useState } from "react";
import ReceiptTable from "./ReceiptTable";

function UnverifiedReceipt() {
  const today = new Date(); // 오늘 날짜
  today.setMonth(today.getMonth() - 1); // 오늘 날짜에서 한 달을 빼줌
  const formattedStartDate = today.toISOString().split("T")[0]; // 날짜를 문자열로 변환하고 'T'를 기준으로 자름
  const formattedEndDate = new Date().toISOString().split("T")[0]; // 오늘 날짜를 얻어 문자열로 변환

  const [startDate, setStartDate] = useState(formattedStartDate);
  const [endDate, setEndDate] = useState(formattedEndDate);

  const [receipts, setReceipts] = useState([]);

  const [filteredReceipts, setFilteredReceipts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/receipts").then((res) => {
      setReceipts(res.data);
    });
  }, [filteredReceipts]);

  const handleSearchClick = () => {
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);

    // startDate와 endDate 사이에 있는 데이터를 필터링
    const filteredData = receipts.filter((receipt) => {
      return (
        receipt.date >= startDate &&
        receipt.date <= endDate &&
        receipt.status === "미확인"
      );
    });
    // 필터링된 데이터를 상태에 저장
    setFilteredReceipts([...filteredData]);
  };
  return (
    <div>
      <div className="listcondition">
        <div className="line">
          <label className="col-form-label labeltitle">수신 일시</label>
          <div className="line">
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            ~&nbsp;
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="listconditionbtn">
          <button
            type="button"
            className="searchButton btn btn-secondary"
            onClick={handleSearchClick}
          >
            조회
          </button>
        </div>
      </div>
      <table className="receiptTable table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" className="tabletop">
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
        <ReceiptTable receipts={filteredReceipts} />
      </table>
    </div>
  );
}

export default UnverifiedReceipt;
