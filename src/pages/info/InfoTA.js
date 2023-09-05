import axios from "axios";

import { useEffect, useState } from "react";


const InfoTA = () => {
  const [year, setYear] = useState("");
  const [listCO, setListCO] = useState([]);
  const [bizno, setBizno] = useState("");
  const [statuscount, setStatuscount] = useState("");
  const [totalcount, setTotalcount] = useState("");
  // const [percentage, setPercentage] = useState('');

  // 연도 입력하는 것 감지
  const onChangeYear = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  // 조회버튼 클릭 시 이벤트
  const onClickYear = (e) => {
    e.preventDefault();
    // console.log('year: ' + year);

    axios.get(`http://localhost:3001/listCO?year=${year}`).then((res) => {
      const receivedData = res.data;

      let sentCount = 0;

      setListCO(receivedData); // year에 맞는 데이터만 listCO 상태 업데이트
      receivedData.map((data) => {
        if (data.status === "전송 완료") {
          sentCount++;
        }
      });
      setListCO(receivedData);
      setStatuscount(sentCount);
      setTotalcount(receivedData.length);

      console.log("statuscount: " + statuscount);

      console.log("totalcount: " + totalcount);
    });
  };

  // listCO 데이터에 변화 생기면 감지하여 rerendering
  useEffect(() => {
    // console.log(listCO)
  }, [listCO, statuscount]);

  // 신고현황 버튼 클릭 시 버튼 변경 및 정보 추가
  const onClickRptBtn = (e, CO) => {
    e.preventDefault();

    // console.log("covalue: " + CO.bizno);

    const currentDateTime = new Date();
    const fmt = currentDateTime.toISOString().substring(0, 10);

    // console.log(CO.status);
    switch (CO.status) {
      case "신고서 제출":
        axios
          .patch(`http://localhost:3001/listCO/${CO.bizno}`, {
            reportdate: fmt,
            reportdoc: "접수증 이미지",
            paymentslip: "납부서 이미지",
            status: "납부서 전송",
          })
          .then((res) => {
            //응답받은 데이터
            const newData = res.data;
            //일치하지 않는 데이터들
            const restList = [...listCO].filter(
              (item) => item.id !== newData.id
            );
            //위에 데이터 합
            const result = [...restList, newData];
            setListCO(result);

            axios
              .get(`http://localhost:3001/listCO?year=${year}`)
              .then((res) => {
                const receivedData = res.data;
              });
          });
        break;

      case "납부서 전송":
        axios
          .patch(`http://localhost:3001/listCO/${CO.bizno}`, {
            transdate: fmt,
            status: "전송 완료",
          })
          .then((res) => {
            //응답받은 데이터
            const newData = res.data;
            //일치하지 않는 데이터들
            const restList = [...listCO].filter(
              (item) => item.id !== newData.id
            );

            //위에 데이터 합
            const result = [...restList, newData];
            setListCO(result);
            setStatuscount((prev) => {
              const newStatuscount = Number(prev) + 1;
              // setPercentage(((statuscount / totalcount) * 100).toFixed(1));
              console.log("statuscount: " + statuscount);
              // console.log('percentage: ' + percentage);
              return newStatuscount;
            });
          });
        break;

      default:
        break;
    }
  };

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

  return (
    <div>
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
                        onChange={onChangeYear}
                        className="m-2"
                      ></input>
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                        id="onClickYear"
                        onClick={onClickYear}
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
                              <td>{CO.bizincome}</td>
                              <td>{CO.tax}</td>
                              <td>{CO.reportdate}</td>
                              <td>{CO.reportdoc}</td>
                              <td>{CO.paymentslip}</td>
                              <td>{CO.transdate}</td>
                              <td>
                                <input
                                  type="button"
                                  className={`btn btn-primary ${
                                    CO.status === "전송 완료" ? "disabled" : ""
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
