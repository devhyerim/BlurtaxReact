import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Nav } from 'react-bootstrap';
import BankSlipTable from './BankSlipTable';
import axios from 'axios';

const BankSlip = () => {

    const [activeTab, setActiveTab] = useState('home');
    const slips = useSelector((state)=> state.bank.wholeSlips);

    const all = useSelector((state)=> state.bank.all);
    const can = useSelector((state)=> state.bank.can);
    const confirmed = useSelector((state)=> state.bank.confirmed);
    const except = useSelector((state)=> state.bank.except);
    const remove = useSelector((state)=> state.bank.remove);
    
    return (
        <div>
            <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link 
                        eventKey="allslip"
                        id="pills-all-tab"
                        className="ms-1"
                        onClick={() => setActiveTab('allslip')}
                    >
                        전　　체
                        <div className="howmany">{all || 0}</div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link 
                        eventKey="canslip" 
                        id="pills-can-tab"
                        className="ms-1"
                        onClick={() => setActiveTab('canslip')}
                    >
                        확정  가능
                        <div className="howmany">{can || 0}</div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link 
                        eventKey="confirmslip"
                        id="pills-certain-tab"
                        className="ms-1"
                        onClick={() => setActiveTab('confirmslip')}
                    >
                        확　　정
                        <div className="howmany">{confirmed || 0}</div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link 
                        eventKey="exceptslip"
                        id="pills-except-tab"
                        className="ms-1"
                        onClick={() => setActiveTab('exceptslip')}
                    >
                        제　　외
                        <div className="howmany">{except || 0}</div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link 
                        eventKey="removeslip" 
                        id="pills-remove-tab"
                        className="ms-1"
                        onClick={() => setActiveTab('removeslip')}
                    >
                        삭　　제
                        <div className="howmany">{remove || 0}</div>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
           
            <div className='mt-3'>
                <BankSlipTable slips={slips} activeTab={activeTab}/>
            </div>
            
        </div>
    );
}

export default BankSlip;