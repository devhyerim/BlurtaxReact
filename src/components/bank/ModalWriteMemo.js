import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWholeBanks, setWholeSlips, setNumber, setRequestWhat } from '../../redux/bankSlice';


const ModalWriteMemo = ({openModal, closeModal, selectedBanks}) => {
  // 은행번호, 메모
  const [bhno, setBhno] = useState("");
  const [memo, setMemo] = useState("");

  // 메모 변경 시 호출
  const handleInputChange = (e) => {
    setMemo(e.target.value);
  }

  useEffect(()=>{
    console.log(selectedBanks);

    selectedBanks.map((bank)=>{
      setBhno(bank.bhno);
      setMemo(bank.memo);
    })
  }, []);

  const dispatch = useDispatch();
  const startDate = useSelector((state)=> state.bank.startDate);
  const endDate = useSelector((state)=> state.bank.endDate);

  let params = {
    bizno: "10001",
    bankname: "신한은행",
    startdate: startDate,
    enddate: endDate
  }

  const getAllBanksAndSlips = () => {
    // {params}로 쓰면 오류..
    axios.post('http://localhost:8081/bank/getHistoryAndSlip', params)
      .then((res) => {
        dispatch(setWholeBanks(res.data.historyList));
        dispatch(setWholeSlips(res.data.slipList));
        dispatch(setNumber({
          "all": res.data.all,
          "can": res.data.can,
          "confirmed": res.data.confirmed,
          "except": res.data.except,
          "remove": res.data.remove,
          "total": res.data.total
        }));
    });
  }

  // 메모 저장
  const saveMemo = () => {
    axios.get(`http://localhost:8081/bank/modifyMemo?bhno=${bhno}&memo=${memo}`);
    alert("메모가 저장되었습니다.");
    getAllBanksAndSlips();
    closeModal(true);
  }

  return(
    <div> 
      <Modal id="memoinsert" show={openModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><strong>메모입력</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <input
              type="text"
              value={memo}
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
            onClick={saveMemo}
          >
            저장
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalWriteMemo;