import "./resources/assets/css/Bank.css";
import "./resources/assets/css/Chat.css";
import React, { useState } from "react";
import Routes from "./Routes";
import TAHeader from "./components/common/TAHeader";
import ConfirmSlipTA from "./components/bank/ConfirmSlipTA";
import COHeader from "./components/common/COHeader";
import ReqMemoCO from "./components/bank/ReqMemoCO";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatBotButton from "./components/common/ChatBotButton";
import InfoBot from "./components/info/InfoBot";
import InvalidBiz from "./components/info/InvalidBiz";
import ValidBiz from "./components/info/ValidBiz";
import DocrequestReview from "./components/docrequest/DocrequestReview";
import DocrequestReviewCreate from "./components/docrequest/DocrequestReviewCreate";

function App() {
  // 세무사인 경우 요청 메시지

  const taSteps = [
    {
      id: "1",
      message: "원하는 메뉴를 선택하세요.",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: "민원서류", label: "민원서류", trigger: "1" },
        { value: "전표증빙", label: "전표증빙", trigger: "1" },
        { value: "통장관리", label: "통장관리", trigger: "3" },
        { value: "신고현황", label: "신고현황", trigger: "201" },
      ],
    },
    /*----------------------- 통장 관리 -----------------------*/
    {
      id: "3",
      message:
        "그린테크소프트의 미확정 전표가 생성되었습니다. 확인하시겠습니까?",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: "내용확인", label: "내용확인", trigger: "5" },
        { value: "페이지 이동", label: "페이지 이동", trigger: "6" },
      ],
    },
    {
      id: "5",
      component: <ConfirmSlipTA />,
    },
    {
      id: "6",
      component: (
        <div>
          <a href="/bank/bankta">통장관리 페이지 이동</a>
        </div>
      ),
      trigger: "1",
    },
    {
      id: "7",
      message: "전표가 확정되었습니다!",
      trigger: "8",
    },
    {
      id: "8",
      options: [
        { value: "확정취소", label: "확정취소", trigger: "1" },
        { value: "페이지 이동", label: "페이지 이동", trigger: "6" },
      ],
    },
    {
      id: '201',
      component: <InfoBot />,
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
      component: <InvalidBiz />,
      trigger: '201'
    },
    {
      id: '204',
      component: <ValidBiz />,
      trigger: '201'
    },
  ];

  // 수임사인 경우 요청 메시지
  const coSteps = [
    {
      id: "1",
      message: "원하는 메뉴를 선택하세요.",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: "민원서류", label: "민원서류", trigger: "300" },
        { value: "전표증빙", label: "전표증빙", trigger: "1" },
        { value: "통장관리", label: "통장관리", trigger: "3" },
        { value: "신고현황", label: "신고현황", trigger: "1" },
      ],
    },
    /*----------------------- 통장 관리 -----------------------*/
    {
      id: "3",
      message: "세무사님이 통장의 내용 확인을 요청했습니다.",
      trigger: "4",
    },
    {
      id: "4",
      component: <ReqMemoCO />,
    },
    {
      id: "5",
      message: "메모가 전달되었습니다!",
      trigger: "1",
    },
    {
      id: '300',
      message: '고객님께서 가장 많이 하신 서류 종류입니다.',
      trigger: 'doctype',
    },
    {
      id: 'doctype',
      options: [
        { value: '사업자등록신청서', label: '사업자등록신청서', trigger: '302' },
        { value: '원천징수이행상황신고서확인', label: '원천징수이행상황신고서확인', trigger: '302' },
        { value: '소득금액확인', label: '소득금액확인', trigger: '302' },
        { value: '납세증명서', label: '납세증명서', trigger: '302' },
        { value: '사실증명', label: '사실증명', trigger: '302' },
      ],
    },
    {
      id: '302',
      message: '가장 많이 신청하신 자료를 토대로',
      trigger: '303',
    },
    {
      id: '303',
      component: <DocrequestReview/>,
      asMessage: true,
      trigger: '304',
    },
    {
      id: '304',
      message: '해당 내용으로 신청하시겠습니까?',
      trigger: '305',
    },
    {
      id: '305',
      options: [
        { value: 'yes', label: 'Yes', trigger: '398' },
        { value: 'no', label: 'No', trigger: '306' },
      ],
    },
    {
      id: '398',
      component: <DocrequestReviewCreate/>,
      asMessage: true,
      trigger: '399',
    },
    {
      id: '399',
      message: '신청이 완료되었습니다.',
      trigger: '1',
    },
    {
      id: '306',
      message: '어떤 부분을 수정하시겠습니까?',
      trigger: '307',
    },
    {
      id: '307',
      options: [
        { value: '신청 서류기간', label: '신청 서류기간', trigger: '310' },
        { value: '발급 부수', label: '발급 부수', trigger: '320' },
        { value: '용도', label: '용도', trigger: '330' },
        { value: '발급 방법', label: '발급 방법', trigger: '340' },
      ],
    },
    {
      id: '310',
      message: '신청 서류기간을 선택해주세요',
      trigger: 'doctagetdate',
    },
    {
      id: 'doctagetdate',
      options: [
        { value: '2018/01/01', label: '2018/01/01', trigger: '303' },
        { value: '2019/01/01', label: '2019/01/01', trigger: '303' },
        { value: '2020/01/01', label: '2020/01/01', trigger: '303' },
        { value: '2021/01/01', label: '2021/01/01', trigger: '303' },
        { value: '2022/01/01', label: '2022/01/01', trigger: '303' },
      ],
    },
    {
      id: '320',
      message: '발급 부수를 선택해주세요',
      trigger: 'count',
    },
    {
      id: 'count',
      options: [
        { value: '1부', label: '1부', trigger: '303' },
        { value: '2부', label: '2부', trigger: '303' },
        { value: '3부', label: '3부', trigger: '303' },
        { value: '4부', label: '4부', trigger: '303' },
        { value: '5부', label: '5부', trigger: '303' },
      ],
    },
    {
      id: '330',
      message: '용도를 선택해주세요',
      trigger: 'purpose',
    },
    {
      id: 'purpose',
      options: [
        { value: '금융기관 제출용', label: '금융기관 제출용', trigger: '303' },
        { value: '공공기관 제출용', label: '공공기관 제출용', trigger: '303' },
        { value: '기타', label: '기타', trigger: '303' },
      ],
    },
    {
      id: '340',
      message: '발급 방법을 선택해주세요',
      trigger: 'way',
    },
    {
      id: 'way',
      options: [
        { value: '온라인발급(PDF)', label: '온라인발급(PDF)', trigger: '303' },
        { value: '온라인발급(전자문서지갑)', label: '온라인발급(전자문서지갑)', trigger: '303' },
        { value: '오프라인발급(FAX)', label: '오프라인발급(FAX)', trigger: '303' },
      ],
    },
  ];

  return (
    <div>
      <Router>
        <Switch>
          {Routes.map((route) => {
            return (
              <Route
                key={route.path}
                exact
                path={route.path}
                render={() => (
                  <>
                    {route.path.includes("ta") &&
                      !route.path.includes("main") && <TAHeader />}
                    {route.path.includes("co") &&
                      !route.path.includes("main") && <COHeader />}
                    {route.path.includes("ta") && !route.path.includes("main")
                      && <ChatBotButton steps={taSteps} />
                    }
                    {route.path.includes("co") && !route.path.includes("main")
                      && <ChatBotButton steps={coSteps} />
                    }
                    <route.component />
                  </>
                )}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
