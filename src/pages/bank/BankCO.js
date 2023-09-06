import '../../resources/assets/css/BankCO.css';
import BankSearch from '../../components/bank/BankSearch';
import BankContents from '../../components/bank/BankContents';
import BankSlip from '../../components/bank/BankSlip';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ChatBotComponent from '../../components/common/ChatBotComponent';
import ReqMemoCO from '../../components/bank/ReqMemoCO';

const BankCO = () => {
  let steps = [
    {
      id: '1',
      message: '세무사님이 통장의 내용 확인을 요청했습니다.',
      trigger: '2',
    },
    {
      id: '2',
      component:(<ReqMemoCO/>)
    },
    {
      id: '3',
      message: '메모가 전달되었습니다!',
      end: true
    }
  ]

  return(
    <div id="main" className="nonsidebar">
      <div className="pagetitle">
        <h1>통장관리</h1>
      </div>
      <div className="card">
        <div className="card-body">	
          <ul className="nav nav-tabs nav-tabs-bordered" id="borderedTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-home" type="button" role="tab" aria-controls="home" aria-selected="true">통장내역</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-profile" type="button" role="tab" aria-controls="profile" aria-selected="false">통장비교</button>
            </li>
          </ul>

          <div className="tab-content pt-2" id="borderedTabContent">
            <div className="tab-pane fade show active" id="bordered-home" role="tabpanel" aria-labelledby="home-tab">
              <BankSearch requestFrom="co"/>
      
              <div className="left" id="leftbank">
                <BankContents requestFrom="co"/>
              </div>
              
              <div className="right" id="rightbank">
                <BankSlip requestFrom="co"/>
              </div>

              <ChatBotComponent steps={steps}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankCO;
