import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addDocrequest, removeDocrequest } from '../../redux/docrequestSlice';

const DocrequestTAModal = ({ show, closeModal, selectDoc }) => {

  const dispatch = useDispatch();

  const eventHandle = () => {
    axios.post(`http://localhost:8081/docrequest/issuance/${selectDoc.docreqno}`)
      .then((res) => {
        const targetIndex = res.data.findIndex(obj => obj.docreqno === selectDoc.docreqno);
        dispatch(removeDocrequest(selectDoc.docreqno));
        dispatch(addDocrequest(res.data[targetIndex]));
        closeModal();
      })
  };


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
                <input type="text" className="form-control" readOnly value={selectDoc && selectDoc.business && selectDoc.business.bizname}/>
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">사업자등록번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.business && selectDoc.business.businesslicense} readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">성명</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.member && selectDoc.member.membername} id="membername" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">주민(법인)번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.member && selectDoc.member.ssn} id="ssn" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">전화번호</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.business && selectDoc.business.bistel} id="bistel" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">업종</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.business && selectDoc.business.industry} id="industry" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">사업장소재지</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={selectDoc && selectDoc.business && selectDoc.business.bizaddress} id="bizaddress" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">신청서류</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" value={selectDoc && selectDoc.doctype} id="doctype" readOnly />
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="inputText" className="col-sm-2 col-form-label">수량</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.count} id="count" readOnly />
              </div>
              <label htmlFor="inputText" className="col-sm-2 col-form-label">용도</label>
              <div className="col-sm-10 half">
                <input type="text" className="form-control" value={selectDoc && selectDoc.purpose} id="purpose" readOnly />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
        <button type="button" className="btn btn-primary" onClick={eventHandle}>발급</button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocrequestTAModal;
