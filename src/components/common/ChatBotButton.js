import React, { useState } from 'react';
import ChatBotComponent from './ChatBotComponent';
import ReqMemoCO from '../bank/ReqMemoCO';
import DocrequestReview from '../docrequest/DocrequestReview';
import DocrequestReviewCreate from '../docrequest/DocrequestReviewCreate';

const ChatBotButton = () => {

  const [chatBotOnOff, setChatBotOnOff] = useState(false);
 
  let steps = [
    {
      id: '1',
      message: '원하는 메뉴를 선택하세요.',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: '민원서류', label: '민원서류', trigger: '300' },
        { value: '전표증빙', label: '전표증빙', trigger: '300' },
        { value: '통장관리', label: '통장관리', trigger: '300' },
        { value: '신고현황', label: '신고현황', trigger: '300' },
      ],
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
        { value: '2018-01-01', label: '2018-01-01', trigger: '303' },
        { value: '2019-01-01', label: '2019-01-01', trigger: '303' },
        { value: '2020-01-01', label: '2020-01-01', trigger: '303' },
        { value: '2021-01-01', label: '2021-01-01', trigger: '303' },
        { value: '2022-01-01', label: '2022-01-01', trigger: '303' },
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

  ]

  

  return(
    <div>
    {/* 챗봇버튼 */}
    <a class={`rsc-float-button sc-fjdhpX ${chatBotOnOff ? "cDkpCQ" : "godhbL1"}`} onClick={() => setChatBotOnOff((chatBotOnOff) => !chatBotOnOff)}>
        <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
    </a>
    <a class={`rsc-float-button sc-fjdhpX ${chatBotOnOff ? "cDkpCQ" : "godhbL2"}`} onClick={() => setChatBotOnOff((chatBotOnOff) => !chatBotOnOff)}>
        <img class="rsc-ts-image sc-gzVnrw cwuCQv" src="data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e" alt="avatar"></img>
    </a>
    
    {/* 챗봇창 */}
    <div class={`rsc-container sc-iwsKbI ${chatBotOnOff ? "hgftJd" : "losXwd"}`} width="350px" height="520px">
        <div class="rsc-header sc-gqjmRU glfuN bg-transparent">
            <a class="rsc-header-close-button sc-jTzLTM kMqZix" onClick={() => setChatBotOnOff((chatBotOnOff) => !chatBotOnOff)}>
                <svg className='me-2' height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
            </a>
        </div>
        <ChatBotComponent steps={steps}/>
        
    </div>
</div>
  );
}

export default ChatBotButton;