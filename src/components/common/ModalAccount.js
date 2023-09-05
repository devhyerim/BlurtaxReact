import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalAccount = ({ openModal, closeModal }) => {
  const [accounts, setAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getAccounts = () => {
    let params = {
      accountname_like: searchValue,
    };

    axios.get("http://localhost:8081/common/accountList").then((res) => {
      setAccounts(res.data);
    });
  };

  useEffect(() => {
    getAccounts();
  }, [searchValue]);

  const searchAccount = (e) => {
    getAccounts();
  };

  return (
    <div>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>계정과목 코드 도움</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="accountTable table table-hover table-bordered">
            <thead>
              <tr>
                <th>No.</th>
                <th>계정과목명</th>
              </tr>
            </thead>
            <tbody id="accountListModal">
              {accounts.length > 0 ? (
                accounts.map((account) => {
                  return (
                    <tr
                      onDoubleClick={() => {
                        closeModal(account.accountNo, account.accountName);
                      }}
                    >
                      <td>{account.accountNo}</td>
                      <td>{account.accountName}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colspan="2">일치하는 계정과목이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div className="input-group mb-3">
            <input
              type="text"
              id="searchedaccountno"
              className="valueToAccount form-control"
              placeholder="계정코드 입력"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="search-account btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onclick={searchAccount}
            >
              찾기
            </button>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            닫기
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            저장
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAccount;
