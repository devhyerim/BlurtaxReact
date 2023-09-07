import axios from "axios";
import InvalidBiz from "../../components/info/InvalidBiz.js";
import ValidBiz from "../../components/info/ValidBiz.js";

import { useEffect, useState } from "react";
import InfoBot from "../../components/info/InfoBot.js";


const InfoTA = () => {
  const [year, setYear] = useState("");
  const [listCO, setListCO] = useState([]);
  const [bizno, setBizno] = useState("");
  const [statuscount, setStatuscount] = useState("");
  const [totalcount, setTotalcount] = useState("");
  const [fmt, setFmt] = useState("");
  // const [percentage, setPercentage] = useState('');


  // 연도 입력하는 것 감지
  const onChangeYear = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };




  const theme = {
    background: 'white',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#4169e1',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#4169e1',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };


  // 조회버튼 클릭 시 이벤트
  const onClickYear = (e) => {
    e.preventDefault();
    // console.log('year: ' + year);

    axios.get(`http://localhost:8081/info/infoTA/year?year=${year}`).then((res) => {
      const receivedData = res.data;
      // console.log(receivedData);

      let sentCount = 0;

      receivedData.map((data) => {
        if (data.status === "전송완료") {
          sentCount++;
        }
      });
      setListCO(receivedData);
      setStatuscount(sentCount);
      setTotalcount(receivedData.length);

    });
  };

  useEffect(() => {
    const currentDateTime = new Date();
    setFmt(currentDateTime);
  }, [])


  // 신고현황 버튼 클릭 시 버튼 변경 및 정보 추가
  const onClickRptBtn = (e, CO) => {
    e.preventDefault();

    switch (CO.status) {
      case "신고서제출":
        axios
          .patch(`http://localhost:8081/info/infoTA/report`, {
            bizno: CO.bizno,
            bizname: CO.bizname,
            year: CO.year,
            bizincome: CO.bizincome,
            tax: CO.tax,
            reportdate: fmt,
            reportdoc: "신고서",
            paymentslip: "납부서",
            status: "납부서전송"
          })
          .then((res) => {

            setListCO(res.data);

          })
          .catch((error) => console.log('에러: ' + error));
        break;

      case "납부서전송":
        // console.log("납부서전송버튼을 눌렀습니다.");
        axios
          .patch(`http://localhost:8081/info/infoTA/transfer`, {
            bizno: CO.bizno,
            bizname: CO.bizname,
            year: CO.year,
            bizincome: CO.bizincome,
            tax: CO.tax,
            // reportdate: CO.reportdate,
            // reportdoc: CO.reportdoc,
            // paymentslip: CO.paymentslip,
            transdate: fmt,
            status: "전송완료"
          })
          .then((res) => {

            setListCO(res.data);


            setStatuscount((prev) => {
              const newStatuscount = Number(prev) + 1;
              // setPercentage(((statuscount / totalcount) * 100).toFixed(1));
              // console.log("statuscount: " + statuscount);
              // console.log('percentage: ' + percentage);
              return newStatuscount;
            });
          })
          .catch((error) => console.log('에러!!!!!: ' + error));
        break;

      default:
        break;
    }
  };

  // 평균 금액보다 높으면 그 이유를 추측할 수 있는 데이터를 뽑아서 설명해주기
  // 1. 2023년 전체 수임처의 결정세액/종합소득금액 평균 구하기
  // 2. 수임처별 결정세액/종합소득금액 평균 구하기
  // 2번의 수치가 1번의 수치를 기준으로 +- 3%이내의 경우 자동 신고 대상 수임처로 분류하기
  // +- 3%를 벗어나는 수임처의 경우, 재검토가 요구되는 수임처로 분류하기
  // 3. alert창 띄우기
  // 오늘은 5월 3일입니다.
  // 소득세 신고기한은 5월 25일입니다.
  // 현재 입력된 금액을 기준으로 자동 신고 대상 수임처는 총 0건 입니다.
  // 현재 입력된 금액을 기준으로 재검토가 요구되는 수임처는 총 0건입니다.
  // 확인 버튼을 누르시면 자동 신고가 완료됩니다.
  // 신고기한 내에는 언제든지 신고내역을 수정하여 제출할 수 있습니다.
  // 4. 확인 버튼 클릭 시 자동 신고 되도록 하기(버튼 바꾸기, 서류 입력, 날짜 입력, 그래프 변경)

  // const clickBirdTalk = () => {
  //   console.log("채팅창이 열립니다.");
  // }


  // const openBot = () => {
  //   setShowBot((prevShowbot) => !prevShowbot);
  // }

  // const closeBot = () => {
  //   setShowBot(false);
  // }
  const steps = [
    {
      id: '201',
      component: <InfoBot />,
      // ,<InvalidBiz />
      trigger: '202'
    },
    {
      id: '202',
      options: [
        { value: 1, label: '재검토 목록 보기', trigger: '203' },
        { value: 2, label: '자동신고 목록 보기', trigger: '204' },
      ],
    },
    {
      id: '203',
      component: <InvalidBiz/>,
      trigger: '201'
    },
    {
      id: '204',
      component: <ValidBiz/>,
      trigger: '201'
    }
  ];




  return (
    <div style={{ height: "100vh" }}>

      <div className="nonsidebar m-3">
        {/* <Sidebar/> */}
        <main>
          <div className="pagetitle">
            <h1>신고현황표</h1>
          </div>
          <br />
          <section className="section dashboard">
            <div className="card ms-3">
              <div className="card-body">
                <br />
                <ul
                  className="nav nav-tabs nav-tabs-bordered"
                  id="borderedTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      종합소득세
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      부가가치세
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      사업장현황
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      법인세
                    </button>
                  </li>
                  <li className="nav-item active" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      원천세
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#bordered-profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      지방소득세
                    </button>
                  </li>
                </ul>

                <form
                  className="selectYear"
                  action="/info/infoTA"
                  method="post"
                >
                  <br />
                  <div>
                    <h4>조회 년도</h4>
                    <div className="selectMonth">
                      <input
                        type="number"
                        name="year"
                        placeholder="2023"
                        value={year}
                        min="1900"
                        max="2100"
                        onChange={(e) => { onChangeYear(e) }}
                        className="m-2"
                      ></input>
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                        id="onClickYear"
                        onClick={(e) => { onClickYear(e) }}
                      >
                        조회
                      </button>
                    </div>
                  </div>
                </form>

                <br />

                <div>
                  <div className="barInfo">
                    <div>
                      <h4>국세청 신고현황</h4>
                    </div>
                    <div className="percentage"></div>
                  </div>

                  <div className="statusBar">
                    <div
                      className="progress-stacked mt-3"
                      style={{ height: 40 + "px" }}
                    >
                      <div
                        className="progress"
                        role="progressbar"
                        style={{
                          width: (statuscount / totalcount) * 100 + "%",
                          height: 40 + "px",
                        }}
                        area-label="Segment one"
                        aria-valuenow={statuscount}
                        aria-valuemin="0"
                        aria-valuemax={totalcount}
                      >
                        <div className="progress-bar">
                          신고완료 {statuscount}건
                        </div>
                      </div>
                      <div
                        className="progress"
                        role="progressbar"
                        style={{
                          width: 100 - (statuscount / totalcount) * 100 + "%",
                          height: 40 + "px",
                        }}
                        area-label=""
                        aria-valuenow={totalcount - statuscount}
                        aria-valuemin="0"
                        aria-valuemax={totalcount}
                      >
                        <div className="progress-bar bg-secondary">
                          미신고 {totalcount - statuscount}건
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div>
                  <h4>
                    신고리스트
                    <span>
                      <button
                        type="button"
                        id="print"
                        className="m-2 printButton btn btn-outline-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          window.print();
                        }}
                      >
                        인쇄
                      </button>
                    </span>
                  </h4>
                </div>

                <div className="tab-content pt-2" id="borderedTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="bordered-home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" className="tabletop">
                            수임처
                          </th>
                          <th scope="col" className="tabletop">
                            귀속년월
                          </th>
                          <th scope="col" className="tabletop">
                            종합소득금액
                          </th>
                          <th scope="col" className="tabletop">
                            결정세액
                          </th>
                          <th scope="col" className="tabletop">
                            신고일자
                          </th>
                          <th scope="col" className="tabletop">
                            접수증
                          </th>
                          <th scope="col" className="tabletop">
                            납부서
                          </th>
                          <th scope="col" className="tabletop">
                            전송일자
                          </th>
                          <th scope="col" className="tabletop">
                            신고현황
                          </th>
                        </tr>
                      </thead>



                      <tbody id="maketd">
                        {listCO.map((CO) => {
                          const formattedBizIncome = parseInt(CO.bizincome).toLocaleString(); // 숫자에 쉼표 추가
                          const formattedTax = parseInt(CO.tax).toLocaleString(); // 숫자에 쉼표 추가
                          return (
                            <tr className={bizno} key={CO.bizno}>
                              <td>
                                {CO.bizname}
                                <input
                                  type="hidden"
                                  name="bizno"
                                  value={CO.bizno}
                                />
                              </td>
                              <td>{CO.year}</td>
                              <td>{formattedBizIncome}</td>
                              <td>{formattedTax}</td>
                              <td>{CO.reportdate}</td>
                              <td>{CO.reportdoc}</td>
                              <td>{CO.paymentslip}</td>
                              <td>{CO.transdate}</td>
                              <td>
                                <input
                                  type="button"
                                  className={`btn btn-primary ${CO.status === "전송완료" ? "disabled" : ""
                                    }`}
                                  onClick={(e) => {
                                    onClickRptBtn(e, CO);
                                  }}
                                  name="rptButton"
                                  value={CO.status}
                                ></input>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>



                    {/* <div className="rsc tutorial">
                      <a className="rsc-float-button sc-fjdhpX godhbL float-end"><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a>
                      <div className="rsc-container sc-iwsKbI losXwd" width="350px" height="520px"><div className="rsc-header sc-gqjmRU glfuN"><h2 className="rsc-header-title sc-VigVT lifvqk">RSC Support</h2><a className="rsc-header-close-button sc-jTzLTM kMqZix"><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a></div><div className="rsc-content sc-gZMcBi hvGjDQ" height="520px"><div className="rsc-ts rsc-ts-bot sc-dnqmqq efROPc"><div className="rsc-ts-image-container sc-htoDjs vmYlS"><img className="rsc-ts-image sc-gzVnrw cwuCQv" src="data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e" alt="avatar"/></div><div className="rsc-ts-bubble sc-bZQynM hQsUiY">Hi! Do you need some help?</div></div><div className="rsc-os sc-EHOje jvzENE"><ul className="rsc-os-options sc-ifAKCX gkhNlr"><li className="rsc-os-option sc-htpNat GgOGn"><a className="rsc-os-option-element sc-bxivhb jdhdOZ">Yes</a></li></ul></div></div><div className="rsc-footer sc-cSHVUG hDUXUW"><input type="textarea" className="rsc-input sc-kAzzGY jZfzBr" placeholder="Type the message ..." disabled="" value=""/><button className="rsc-submit-button sc-chPdSV iUYVrA" disabled=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg></button></div></div>
                    </div> */}
                  </div>

                  <div
                    className="tab-pane fade"
                    id="bordered-profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <h2>페이지를 제작 중입니다.</h2>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="bordered-contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  ></div>
                </div>

              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default InfoTA;
