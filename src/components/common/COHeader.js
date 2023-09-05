import "../../resources/assets/css/header.css";
import "../../resources/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleBodyClick } from "../../redux/sidebarSlice";

const COHeader = () => {
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
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="../home/homeco" className="logo d-flex align-items-center">
          <img src="/img/logo.png" alt="" />
          <span className="d-none d-lg-block">BlurTax</span>
          <span className="edge">edge</span>
        </a>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={() => dispatch(handleBodyClick())}
        ></i>
      </div>
      <nav id="navbar" className="navbar">
        <ul>
          <li className="dropdown">
            <a href="#">
              <span>매입/매출거래현황</span>{" "}
              <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul className="dropnavs">
              <li>
                <a href="#">통장입출금현황</a>
              </li>
              <li>
                <a href="#">카드매출현황</a>
              </li>
              <li>
                <a href="#">매출/매입현황</a>
              </li>
              <li>
                <a href="#">경영현황</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>증빙기장관리</span>
              <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul className="dropnavs">
              <li>
                <a href="/bank/bankco">통장정리</a>
              </li>
              <li>
                <a href="/receipt/receiptco">증빙/영수증관리</a>
              </li>
              <li>
                <a href="#">전자세금계산서</a>
              </li>
              <li>
                <a href="#">청구서조회</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>세무서비스관리</span>
              <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul className="dropnavs">
              <li>
                <a href="/info/infoCO">신고/납부현황</a>
              </li>
              <li>
                <a href="#">문서보관함</a>
              </li>
              <li>
                <a href="/docrequest/docrequestCO">민원서류</a>
              </li>
              <li>
                <a href="#">세무대리공유폴더</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>법인통장관리</span>
              <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul className="dropnavs">
              <li>
                <a href="#">통장기본설정</a>
              </li>
              <li>
                <a href="#">카드기본설정</a>
              </li>
              <li>
                <a href="#">출금동의관리</a>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#">
              <span>설정관리</span>
              <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul className="dropnavs">
              <li>
                <a href="#">개인정보설정</a>
              </li>
              <li>
                <a href="#">회사관리</a>
              </li>
              <li>
                <a href="#">홈택스인증서관리</a>
              </li>
              <li>
                <a href="#">청구/수금설정</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
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
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
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

          <li className="nav-item dropdown" onClick={msgToggle}>
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-chat-left-text"></i>
              <span className="badge bg-success badge-number">3</span>
            </a>

            {msgIsOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end 
                        dropdown-menu-arrow messages show"
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  margin: "0px",
                  transform: "translate3d(-24.6667px, 35.3333px, 0px)",
                }}
                data-popper-placement="bottom-end"
              >
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
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

          <li className="nav-item dropdown pe-3" onClick={profileToggle}>
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="/img/coprofile.png"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                김성민
              </span>
            </a>
            {profileIsOpen && (
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile show"
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  margin: "0px",
                  transform: "translate3d(-16.6667px, 38px, 0px)",
                }}
                data-popper-placement="bottom-end"
              >
                <li className="dropdown-header">
                  <h6>김성민</h6>
                  <span>그린테크소프트</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>개인정보</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>환경설정</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>도움말</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
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
};

export default COHeader;
