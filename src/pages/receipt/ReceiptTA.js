import "../../resources/assets/css/receiptTA.css";
import React, { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import { useSelector } from "react-redux";
import UnverifiedReceipt from "../../components/receipt/UnverifiedReceipt";
import ConfirmedReceipt from "../../components/receipt/ComfirmedReceipt";
import { Card, Tab, Tabs } from "react-bootstrap";
import RejectedReceipt from "../../components/receipt/RejectedReceipt";

function ReceiptTA() {
  const isBodyActive = useSelector((state) => state.sidebar.isBodyActive);

  const [key, setKey] = useState("UnverifiedReceipt");
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
                      src={"/img/download.png"}
                      alt="receipt"
                      className="img-fluid custom-image"
                    />
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
                      <UnverifiedReceipt />
                    </Tab>
                    <Tab eventKey="ConfirmedReceipt" title="적합 증빙">
                      <ConfirmedReceipt />
                    </Tab>
                    <Tab eventKey="RejectedReceipt" title="부적합 증빙">
                      <RejectedReceipt />
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
