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

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={process.env.PUBLIC_URL + '/img/localtax.PNG'}
                            style={{ maxWidth: "100%" , height: "auto" }}></img>
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
