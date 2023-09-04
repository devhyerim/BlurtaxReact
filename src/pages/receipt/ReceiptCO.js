import axios from "axios";
import React, { useState } from "react";
import { Card, Image } from "react-bootstrap";

function ReceiptCO() {
  const [uploadFile, setUploadFile] = useState(null);
  const [purpose, setPurpose] = useState("");

  const checkExtension = (fileName) => {
    const regex = new RegExp("^(?!.*.(jpg|png|pdf)$).*$");
    if (regex.test(fileName)) {
      alert("해당 종류의 파일은 업로드할 수 없습니다.");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setUploadFile(files[0]);
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleUpload = () => {
    if (!uploadFile) {
      alert("파일을 선택해주세요.");
      return;
    }
    if (!checkExtension(uploadFile.name)) {
      return;
    }

    const today = new Date(); // 현재 날짜
    const formattedDate = today.toISOString().split("T")[0]; // 날짜를 문자열로 변환하고 'T'를 기준으로 자름

    const dataToPost = {
      purpose, // 사용자가 입력한 목적을 사용
      memo: "",
      status: "미확인",
      date: formattedDate, // 오늘 날짜
    };

    axios
      .post("http://localhost:3001/receipts", dataToPost)
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.error("POST 요청 실패:", error);
      });
  };

  return (
    <>
      <div id="main" className="pagetitle" style={{ marginLeft: "0%" }}>
        <h1>증빙전표업로드</h1>
      </div>
      <section className="section dashboard">
        <Card className="card">
          <Card.Body className="card-body">
            <div className="left" style={{ marginLeft: "0%", width: "50%" }}>
              <Image src={"/img/upload2.png"} alt="receipt" fluid />
            </div>
            <div className="right" style={{ width: "50%" }}>
              <Card className="mb-3 card">
                <div className="uploadDiv tab-content pt-2">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <span className="input-group-text">증빙목적</span>
                  <textarea
                    className="form-control"
                    value={purpose}
                    onChange={handlePurposeChange}
                  />
                </div>
                <button
                  className="btn btn-secondary"
                  id="uploadBtn"
                  name="uploadFile"
                  onClick={handleUpload}
                >
                  업로드
                </button>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </section>
    </>
  );
}

export default ReceiptCO;
