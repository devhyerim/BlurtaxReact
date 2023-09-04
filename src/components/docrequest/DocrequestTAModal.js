import React from 'react';
import { Modal } from 'react-bootstrap';

const DocrequestTAModal = ({ show, closeModal }) => {
  return (
    <Modal show={show} onHide={closeModal} style={{ '--bs-modal-width': '750px' }}>
      <Modal.Header closeButton>
        <Modal.Title><strong>민원서류 발급신청</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modaltable">
          <div className="card-body">
            <h5 className="card-title">신청내역 상세조회</h5>

            <input type="hidden" id="buttonValue" name="docreqno" />

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">상호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="bizname" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">사업자등록번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="businesslicense" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">성명</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="membername" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">주민(법인)번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="ssn" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">전화번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="bistel" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">업종</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="industry" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">사업장소재지</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="bizaddress" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">신청서류</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="doctype" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">수량</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="count" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">용도</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" id="purpose" readOnly />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
        <button type="submit" className="btn btn-primary">발급</button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocrequestTAModal;
