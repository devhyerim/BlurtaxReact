import React from 'react';

const DocrequestCOSidebar = ({openModal}) => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <button type="button" className="btn btn-outline-primary docbtn" onClick={openModal}>
            민원서류 신청하기
          </button>
          <br />
          <br />
          <li className="nav-item-divider"></li>
          <br />
          <li className="nav-item">
            <a className="nav-link " href="#">
              <i className="bi bi-grid"></i> <span>전체민원서류</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>사업자등록신청서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>사업자등록증재교부신청서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>사업자등록정정신고서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>휴폐업신고서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>총괄납부승인/변경/포기신청</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>간이과세적용신청/포기신고서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>면세적용신청/포기신고서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>재무재표등 확인</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>원천징수이행상황신고서 확인</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>소득금액확인</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>납세증명서</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-journal-text"></i> <span>사실증명</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default DocrequestCOSidebar;
