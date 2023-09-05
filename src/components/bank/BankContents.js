import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BankbookTable from "./BankbookTable";

const BankContents = ({requestFrom}) => {

    // 선택한 탭
    const [activeTab, setActiveTab] = useState('bankall');
    // 은행내역
    const banks = useSelector((state)=> state.bank.wholeBanks);
 
    return(
        <div>
            <Nav variant="tabs" defaultActiveKey="/bankall">
                <Nav.Item>
                  <Nav.Link eventKey="bankall" onClick={() => setActiveTab('bankall')}>전체</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="banknone" onClick={() => setActiveTab('banknone')}>전표미연결</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bankconn" onClick={() => setActiveTab('bankconn')}>전표연결</Nav.Link>
                </Nav.Item>
            </Nav>
            
            <BankbookTable banks={banks} activeTab={activeTab} requestFrom={requestFrom}/>

        </div>
    );
}

export default BankContents;