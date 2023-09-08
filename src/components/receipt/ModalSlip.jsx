import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function ModalSlip({ FormToData }) {
  const [show, setShow] = useState(false);
  console.log(FormToData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCashSlip = () => {
    axios
      .post("http://localhost:8081/receipt/cashslipConfirmed", FormToData)
      .then((res) => {
        console.log(res.data);
        handleClose();
      });
  };
  return (
    <>
      <button
        type="button"
        className="cashSlipConfirmed btn btn-outline-success"
        onClick={handleShow}
      >
        전표반영
      </button>
      <Modal
        id="registerCashSlip"
        tabIndex="-1"
        aria-labelledby="registerCashSlipModalLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header>
          <Modal.Title className="modal-title fs-5" id="accountModalLabel">
            전표 승인
          </Modal.Title>
          <button
            type="button"
            className=" btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <h1 className="textSlip">전표를 승인하시겠습니까?</h1>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button
            type="button"
            className="confirmedBtn btn btn-primary"
            value="1"
            data-bs-dismiss="modal"
            onClick={handleCashSlip}
          >
            확인
          </button>
          <button
            type="button"
            className="unconfirmedBtn btn btn-secondary"
            value="2"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            닫기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSlip;
