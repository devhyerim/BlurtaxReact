import { Modal } from "react-bootstrap";
import React, { useState } from 'react';

const ModalReqMemo = ({ openModal, closeModal, selectedBanks }) => {

  // 요청 메시지 
  const [message, setMessage] = useState("거래내용 확인 부탁드립니다.");

  // 요청 메시지 변경 시 호출
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  return (
    <div>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>내용 확인 요청</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modaltable">
            <div className="tabletitle">통장내역</div>
            {
              selectedBanks.map((bank)=>{
                let formattedDate = new Intl.DateTimeFormat('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(bank.bhdate)).replace(/\//g, '-');
                let formattedAmount = bank.amount.toLocaleString('en-US');

                return(
                  <div>
                    <table>
                      <tr>
                        <td className="modalintitle">일자</td>
                        <td>
                          <input 
                            type="text" 
                            className="intable"
                            value={formattedDate} 
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="modalintitle">내용</td>
                        <td>
                          <input 
                            type="text" 
                            className="intable"
                            value={bank.source} 
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="modalintitle">금액</td>
                        <td>
                          <input 
                            type="text" 
                            className="intable"
                            value={formattedAmount} 
                            readOnly
                          />
                        </td>
                      </tr>
                    </table>
                    <br/>
                  </div>
                );
              })
            }
          </div>
          <div>
            <label className="labeltitle2">문의 내용</label>
            <input
              type="text"
              id="message"
              className="modaltext"
              value={message}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="button"
            className="btn btn-primary"
            id="sendmessagebtn"
          >
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalReqMemo;