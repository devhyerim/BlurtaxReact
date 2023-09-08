import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";

const InfoModal = ({ CO }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const formattedIncome = parseInt(CO.bizincome).toLocaleString();
    const formattedTax = parseInt(CO.tax).toLocaleString();


    return (

        <div>
            <Button variant='light' onClick={handleShow}>
                {CO.bizname}
            </Button>
            <Modal CO={CO} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{CO.bizname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tr className="m-3">
                            <td>총 매출</td>
                            <td>401,325,000원</td>
                        </tr>
                        <tr className="m-3">
                            <td>총 매출원가</td>
                            <td style={{color: 'red'}}>275,854,000원</td>
                        </tr>
                        <tr className="m-3">
                            <td>영업 외 손익</td>
                            <td>24,269,500원</td>
                        </tr>
                        <tr className="m-3">
                            <td>사업소득</td>
                            <td>{formattedIncome}원</td>
                        </tr>
                        <tr className="m-3">
                            <td>산출세액</td>
                            <td>{formattedTax}원</td>
                        </tr>

                    </table>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InfoModal;