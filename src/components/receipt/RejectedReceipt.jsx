import React, { useState } from "react";
import ModalMemo from "./ModalMemo";
import RejectedCollapse from "./RejectedCollapse";

function RejectedReceipt() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" className="th-first tabletop">
              No.
            </th>
            <th scope="col" className="tabletop">
              증빙내용
            </th>
            <th scope="col" className="tabletop">
              적용여부
            </th>
            <th scope="col" className="tabletop">
              부적합사유
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
                className="td-first unconfirmed form-check-input"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample2"
                aria-controls="collapseExample"
                type="checkbox"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
              />
            </td>
            <td>비품구매</td>
            <td>부적합</td>
            <td>이미 반영된 증빙입니다.</td>
            <td>
              <ModalMemo />
            </td>
          </tr>
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
    </div>
  );
}

export default RejectedReceipt;
