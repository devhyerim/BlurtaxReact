import React, { useState } from "react";
import { Modal } from "react-bootstrap";

function ModalMemo({ memo }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        data-bs-toggle="modal"
        data-bs-target="#memoModal"
        onClick={handleShow}
      >
        <i className="ri-article-fill"></i>
      </button>
      <Modal
        centered
        show={show}
        onHide={handleClose}
        // backdrop="static"
      >
        <Modal.Header className="modal-header">
          <Modal.Title className="modal-title fs-5" id="memoModalLabel">
            메모
          </Modal.Title>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <form>
            <textarea className="form-control" id="message-text">
              {memo}
            </textarea>
          </form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMemo;
