import axios from "axios";
import React, { useState } from "react";
import { Card, Image } from "react-bootstrap";

function ReceiptCO() {
  const [image, setImage] = useState("/img/upload2.png");
  const [uploadFiles, setUploadFiles] = useState([]);
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
    const selectedFiles = Array.from(e.target.files); // 파일선택창에서 선택한 파일들

    // 선택한 파일들을 기존 파일 배열에 추가
    setUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImage("/img/" + selectedFiles[0].name);
    console.log(selectedFiles[0].name);
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }
    if (!checkExtension(uploadFiles[0].name)) {
      return;
    }

    const today = new Date(); // 현재 날짜
    const formattedDate = today.toISOString().split("T")[0]; // 날짜를 문자열로 변환하고 'T'를 기준으로 자름
    const formData = new FormData();
    uploadFiles.forEach((file) => {
      // 파일 데이터 저장
      formData.append("multipartFiles", file);
    });
    const dataToPost = {
      purpose: purpose, // 사용자가 입력한 목적을 사용
    };

    await axios
      .post("http://localhost:8081/receipt/uploadFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*", // 파일 업로드를 위한 헤더 설정
        },
        params: dataToPost, // 기타 데이터는 URL 매개변수로 보낼 수 있음
      })
      .then(() => {
        alert("등록이 완료되었습니다!");
        console.log("파일 등록");
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
              <Image src={image} alt="receipt" fluid />
            </div>
            <div className="right" style={{ width: "50%" }}>
              <Card className="mb-3 card">
                <div className="uploadDiv tab-content pt-2">
                  <input
                    className="form-control"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                  />
                  <span className="input-group-text mt-3">증빙목적</span>
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
