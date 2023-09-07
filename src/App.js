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
        { value: "신고현황", label: "신고현황", trigger: "1" },
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
        { value: "민원서류", label: "민원서류", trigger: "1" },
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
                    //  && <ChatBotButton steps={taSteps}/>
                    }
                    {route.path.includes("co") && !route.path.includes("main")
                    //  && <ChatBotButton steps={coSteps}/>
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
