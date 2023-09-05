import React from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addDocrequest, removeDocrequest } from '../../redux/docrequestSlice';


const DocrequestCORModal = ({ show, closeModal ,selectDoc}) => {

    const dispatch = useDispatch();

    const eventHandle = () => {
      axios.post(`http://localhost:8081/docrequest/received/${selectDoc.docreqno}`)
        .then((res) => {
          const targetIndex = res.data.findIndex(obj => obj.docreqno === selectDoc.docreqno);
          dispatch(removeDocrequest(selectDoc.docreqno));
          dispatch(addDocrequest(res.data[targetIndex]));
          closeModal();
        })
    };

    return (
        <>

            <Modal show={show} onHide={closeModal} style={{ '--bs-modal-width': '750px' }} >
                <Modal.Header closeButton>
                    <Modal.Title><strong>민원서류 수신확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modaltable">
                        <div class="card-body">
                            <h5 class="card-title card-title2">요청하신 민원서류를 수신하시겠습니까?</h5>

                            <input type="hidden" id="buttonValue2" name="docreqno"></input>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                    <button type="submit" className="btn btn-primary" onClick={eventHandle}>확인</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DocrequestCORModal;
