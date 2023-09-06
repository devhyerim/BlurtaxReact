import axios from "axios";
import React from "react";
import { useState } from "react";
import ModalMemo from "./ModalMemo";
import RejectedCollapse from "./RejectedCollapse";

function RejectedTable({ receipts, onRecreqno }) {
  console.log("receipts: ", receipts);
  const [open, setOpen] = useState(false);
  const [recreqno, setRecreqno] = useState("");
  // PATCH 요청을 보낼 URL과 데이터를 정의
  // Axios를 사용하여 PATCH 요청
  const handleToggle = (recreqno) => {
    setOpen(!open);
    setRecreqno(recreqno);
    onRecreqno(recreqno);
    // console.log("ttttttttttttttttttttttttttt : " + recreqno);
  };

  return (
    <>
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
            .filter((receipt) => receipt.unconfirmed.ucrno !== null)
            .map((receipt) => {
              return (
                <tr key={receipt.recreqno}>
                  <td>
                    <input
                      className="td-first unconfirmed form-check-input"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample2"
                      aria-controls="collapseExample"
                      type="checkbox"
                      onClick={() => {
                        handleToggle(receipt.recreqno);
                      }}
                    />
                    <span hidden>{receipt.recreqno}</span>
                  </td>
                  <td>{receipt.purpose}</td>
                  <td>부적합</td>
                  <td>{receipt.unconfirmed.contents}</td>
                  <td>
                    <ModalMemo />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <RejectedCollapse open={open}>
        <button
          type="button"
          className="btn btn-outline-success"
          //   style="float: right;"
        >
          적합으로 변경
        </button>
      </RejectedCollapse>
    </>
  );
}

export default RejectedTable;
