import React from 'react';
import { Modal } from 'react-bootstrap';


const DocrequestCOCKModal = ({ show, closeModal }) => {
    return (
        <>

            <Modal show={show} onHide={closeModal} style={{ '--bs-modal-width': '750px' }} >
                <Modal.Header closeButton>
                    <Modal.Title><strong>민원서류 수신확인</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="modaltable">
                        <div class="card-body">
                            <h5 class="card-title card-title2">요청서류</h5>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                {/* <img src="/resources/upload/localtax.PNG" style="max-width: 100%; height: auto;"></img> */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary" onClick={closeModal}>닫기</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DocrequestCOCKModal;
