import '../../resources/assets/css/header.css';
import '../../resources/assets/vendor/bootstrap-icons/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleBodyClick } from '../../redux/sidebarSlice'; 

// 사이드바 메뉴 토글 함수를 받음
const TAHeader = () => {

  // 프로필 토글
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  // 메시지 토글
  const [msgIsOpen, setMsgIsOpen] = useState(false);
  const dispatch = useDispatch();

  const profileToggle = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  const msgToggle = () => {
    setMsgIsOpen(!msgIsOpen);
  }

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="../home/hometa" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
          <span className="d-none d-lg-block">BlurTax</span>
          <span className="additional">.</span>
        </a>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={() => dispatch(handleBodyClick())}
        ></i>
      </div>
      <nav id="navbar" className="navbar">
        <ul>
          <li className="dropdown"><a href="#"><span>수임처관리</span> <i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">수임처 정보</a></li>
              <li><a href="#">수임처별 업무체크리스트</a></li>
              <li><a href="/docrequest/docrequestTA">민원서류 및 증명서류</a></li>
              <li><a href="#">재무자료전송관리</a></li>
              <li><a href="#">부가세신고현황리포트</a></li>
              <li><a href="#">인건비신고현황리포트</a></li>
            </ul>
          </li>
          <li className="dropdown"><a href="#"><span>기장업무</span><i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">기장진도현황</a></li>
              <li><a href="#">자동전표처리</a></li>
              <li><a href="/receipt/receiptta">증빙전표입력</a></li>
              <li><a href="/bank/bankta">통장정리</a></li>
              <li><a href="#">수임처 직원정보</a></li>
              <li><a href="#">수임처 급여관리</a></li>
            </ul>
          </li>
          <li className="dropdown"><a href="#"><span>신고업무</span><i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">종합소득세 신고관리</a></li>
              <li><a href="/info/infoTA">신고현황표</a></li>
              <li><a href="#">신고상황분석표</a></li>
              <li><a href="#">인사정보변동관리</a></li>
              <li><a href="#">4대보험 일괄신고</a></li>
              <li><a href="#">신용카드 매출자료조회</a></li>
              <li><a href="#">고지 및 체납내역 조회</a></li>
              <li><a href="#">사업용계좌신고 현황조회</a></li>
            </ul>
          </li>
          <li className="dropdown"><a href="#"><span>청구/수금</span><i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">청구서관리</a></li>
              <li><a href="#">수금/정산관리</a></li>
              <li><a href="#">출금동의관리</a></li>
            </ul>
          </li>
          <li className="dropdown"><a href="#"><span>업무관리</span><i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">일일업무보고</a></li>
              <li><a href="#">담당자별현황</a></li>
              <li><a href="#">일일업무현황</a></li>
              <li><a href="#">데이터내리기 히스토리</a></li>
              <li><a href="#">수임기업 생성관리</a></li>
            </ul>
          </li>
          <li className="dropdown"><a href="#"><span>설정관리</span><i className="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul className="dropnavs">
              <li><a href="#">공지사항</a></li>
              <li><a href="#">권한관리</a></li>
              <li><a href="#">수집정보등록</a></li>
              <li><a href="#">홈택스인증서관리</a></li>
              <li><a href="#">청구/수금설정</a></li>
            </ul>
          </li>
        </ul>
      </nav>


      <div className="search-bar">
        <form className="search-form d-flex align-items-center" method="POST" action="#">
          <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
          <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-info-circle text-primary"></i>
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>

            </ul>

          </li>

          <li
            className="nav-item dropdown"
            onClick={msgToggle}
          >

            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>

            {msgIsOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end 
                        dropdown-menu-arrow messages show"
                style={{
                  position: 'absolute',
                  inset: '0px 0px auto auto',
                  margin: '0px',
                  transform: 'translate3d(-24.6667px, 35.3333px, 0px)',
                }}
                data-popper-placement="bottom-end"
              >
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src="/img/messages-1.jpg" alt="" className="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src="/img/messages-2.jpg" alt="" className="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img src="/img/messages-3.jpg" alt="" className="rounded-circle" />
                    <div>
                      <h4>David Muldon</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>

              </ul>
            )}

          </li>

          <li
            className="nav-item dropdown pe-3"
            onClick={profileToggle}
          >
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="/img/taprofile.png" alt="Profile" className="rounded-circle" />
              <span className="d-none d-md-block dropdown-toggle ps-2">박채원</span>
            </a>
            {profileIsOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show"
                style={{
                  position: 'absolute',
                  inset: '0px 0px auto auto',
                  margin: '0px',
                  transform: 'translate3d(-16.6667px, 38px, 0px)',
                }}
                data-popper-placement="bottom-end"
              >
                <li className="dropdown-header">
                  <h6>박채원</h6>
                  <span>채원 세무회계</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i className="bi bi-person"></i>
                    <span>개인정보</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i className="bi bi-gear"></i>
                    <span>환경설정</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i className="bi bi-question-circle"></i>
                    <span>도움말</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>로그아웃</span>
                  </a>
                </li>

              </ul>
            )}
          </li>

        </ul>
      </nav>
    </header>
  );
}


export default TAHeader;