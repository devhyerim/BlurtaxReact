import "../../resources/assets/css/receiptTA.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { useSelector } from "react-redux";
import UnverifiedReceipt from "../../components/receipt/UnverifiedReceipt";
import ConfirmedReceipt from "../../components/receipt/ComfirmedReceipt";
import { Card, Tab, Tabs } from "react-bootstrap";
import RejectedReceipt from "../../components/receipt/RejectedReceipt";
import axios from "axios";

function ReceiptTA() {
  const [receipts, setReceipts] = useState([]);
  const [image, setImage] = useState("/img//download.png");
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [key, setKey] = useState("UnverifiedReceipt");
  const [drecreqno, setDrecreqno] = useState(null);

  const onDRecreqno = (value) => {
    setDrecreqno(value);
    // console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy : " + value);
    handleRadioChange(value);
  };
  const setRecreqno = (value) => {
    setRecreqno(value);
    // console.log("rrrrrrrrrrrrrrrrrr" + value);
  };
  const isBodyActive = useSelector((state) => state.sidebar.isBodyActive);
  useEffect(() => {
    axios.get("http://localhost:8081/receipt/receiptList").then((res) => {
      setReceipts(res.data);
    });
  }, [key]);

  // 라디오 버튼 값 변경 시 호출될 함수
  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    // 여기에서 선택된 값(value)을 사용할 수 있습니다.
    axios
      .get(`http://localhost:8081/receipt/getImgResource?recreqno=${value}`)
      .then((res) => {
        // console.log(res.data);
        setImage("/img/" + res.data);
      });
  };
  // const handleToggle = (recreqno) => {
  //   setOpen(!open);
  //   console.log("rejected : " + recreqno);
  // };
  return (
    <div>
      <div id="main" className={isBodyActive ? "toggle-sidebar" : ""}>
        <Sidebar />
        <main className="main">
          <div className="pagetitle">
            <h1>증빙전표입력</h1>
          </div>
          <br />
          <section className="section dashboard">
            <div className="card">
              <div className="card-body">
                <div className="left">
                  <div>
                    <img
                      src={image}
                      alt="receipt"
                      className="img-fluid custom-image"
                    />
                    {/* <span hidden>{selectedRadio}</span> */}
                  </div>
                </div>
                <Card className="card">
                  <Tabs
                    defaultActiveKey="UnverifiedReceipt"
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    fill
                    justify
                  >
                    <Tab eventKey="UnverifiedReceipt" title="미확인 증빙">
                      <UnverifiedReceipt onRadioChange={handleRadioChange} />
                    </Tab>
                    <Tab eventKey="ConfirmedReceipt" title="적합 증빙">
                      <ConfirmedReceipt
                        selectedRadio={selectedRadio}
                        receipts={receipts}
                      />
                    </Tab>
                    <Tab eventKey="RejectedReceipt" title="부적합 증빙">
                      <RejectedReceipt
                        receipts={receipts}
                        onRecreqno={onDRecreqno}
                      />
                    </Tab>
                  </Tabs>
                </Card>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ReceiptTA;
