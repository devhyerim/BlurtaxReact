import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
const HomeTABody = () => {

    const [searchKeyword, setSearchKeyword] = useState('');
    const [businesses] = useState([
        { id: 10001, name: '그린테크소프트', type: 'IT', registrationNumber: '654-98-71234' },
        { id: 10002, name: '산들산들서점', type: '판매', registrationNumber: '476-21-52319' },
        { id: 10003, name: '착한식품농장', type: '유통', registrationNumber: '327-45-61892' },
        { id: 10004, name: '바른공사', type: '건설', registrationNumber: '215-97-63482' },
        { id: 10005, name: '다정약국', type: '판매', registrationNumber: '671-34-52981' },
        { id: 10006, name: '프렘뷰티', type: '서비스', registrationNumber: '348-92-51617' },
        { id: 10007, name: '달콤베이커리', type: '제과', registrationNumber: '923-16-47528' },
        { id: 10008, name: '더숲서점', type: '판매', registrationNumber: '756-41-23859' },
        { id: 10009, name: '작은연극단', type: '공연', registrationNumber: '562-39-87124' },
        { id: 10010, name: '영진철강', type: '제조', registrationNumber: '891-27-43651' },
        { id: 10011, name: '한영테크', type: 'IT', registrationNumber: '375-03-36685' },
    ]);

    const filteredBusinesses = businesses.filter((business) => {
        return business.name.includes(searchKeyword);
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // 검색 로직을 추가할 수 있음
    };

    const activities = [
        {
            time: '32 min',
            color: 'success',
            description: '그린테크 회사의 부가세과표.면세수입금액 확인',
            link: '/docrequest/docrequestTA',
            action: '민원 서류 신청',
        },
        {
            time: '56 min',
            color: 'danger',
            description: '그린테크 회사의 영수증',
            link: '/receipt/receiptta',
            action: '증빙 전표 신청',
        },
        {
            time: '2 hrs',
            color: 'primary',
            description: '그린테크 재무 데이터 수집 및 검토',
        },
        {
            time: '1 day',
            color: 'info',
            description: '그린테크 회사의 종합소득세 신고 완료',
            link: '/info/infoTA',
            action: '종합소득세 신고',
        },
        {
            time: '2 days',
            color: 'warning',
            description: '그린테크 회사의 자산 관리를 위해 고정자산 목록 작성 및 갱신',
        },
        {
            time: '3 days',
            color: 'warning',
            description: '그린테크 기업의 국민은행 통장내역 내용확인 요청',
            link: '/bank/bankco',
            action: '내용확인',
        },
        {
            time: '2 weeks',
            color: 'primary',
            description: '영진철강 기업의 재무 데이터 수집 및 검토',
        },
        {
            time: '3 weeks',
            color: 'info',
            description: '영진철강 기업의 종합소득세 신고 완료',
            link: '/info/infoTA',
            action: '종합소득세 신고',
        },
        {
            time: '4 weeks',
            color: 'muted',
            description: '그린테크 기업 BlurTax 가입 초대',
        },
    ];


    return (
        <>
            <div className="row">
                <div className="row row2">

                    {/* Customers Card */}
                    <div className="col-xxl-4 col-xl-12 login">

                        <div className="card info-card customers-card cardf ">

                            <div className="card-body ">
                                <h5 className="card-title">채원 세무회계<span> | 세무사</span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>박채원</h6>
                                        <span className="text-danger small pt-1 fw-bold">담당자</span> <span className="text-muted small pt-2 ps-1">sky@naver.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Customers Card */}

                    {/* Menu Card */}
                    <div className="col-xxl-4 col-xl-12 menu">

                        <div className="card info-card customers-card cardf">

                            <div className="card-body2">

                                {/* Slides with indicators */}
                                <div>
                                    <Carousel>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/images/mainbn1.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 1"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/images/mainbn2.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 2"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/images/mainbn3.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 3"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/images/mainbn4.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 4"
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                {/* End Slides with indicators */}

                            </div>
                        </div>
                    </div>
                    {/* End menu Card */}

                    <div className="importantmenu">
                        <div className="col-lg-3">
                            <div className="service-item first-service">
                                <div className="icon"></div>
                                <h4>민원 서류</h4>
                                <p>수임고객이 신청한 서류를 실시간으로 확인하여 발급 관리</p>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="service-item second-service">
                                <div className="icon"></div>
                                <h4>전표증빙</h4>
                                <p>수임고객이 촬영한 증빙영수증의 실시간 확인과 편리한 전표처리</p>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="service-item third-service">
                                <div className="icon"></div>
                                <h4>통장 관리</h4>
                                <p>내용 파악이 어려웠던 통장내역을 함께 확인하고 바로 처리</p>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="service-item fourth-service">
                                <div className="icon"></div>
                                <h4>신고현황</h4>
                                <p>언제 어디서든 즉시 확인 가능한 신고서, 납부서</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end row2 */}

                <div className="row row3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">기업 활동 내역 <span>| Activity</span></h5>
                            <div className="activity">
                                {activities.map((activity, index) => (
                                    <div className="activity-item d-flex" key={index}>
                                        <div className="activite-label">{activity.time}</div>
                                        <i className={`bi bi-circle-fill activity-badge text-${activity.color} align-self-start`}></i>
                                        <div className="activity-content">
                                            {activity.description} <a href={activity.link} className="fw-bold text-dark">{activity.action}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                





                <div className="col-lg-6">
                    <div className="card recent-sales overflow-auto">
                        <div className="card-body">
                            <h5 className="card-title card-title2">담당 수임사 리스트</h5>
                            <ul className="sidebar-nav" id="sidebar-nav">
                                <li className="nav-item nav-item-title">
                                    <div className="d-flex align-items-center">
                                        <div className="search-bar bizsearch flex-grow-1">
                                            <form className="search-form d-flex align-items-center search-biz2" onSubmit={handleSearch}>
                                                <input
                                                    type="text"
                                                    name="bizname"
                                                    id="searchbusiness"
                                                    placeholder="수임기업명을 검색하세요"
                                                    title="Enter search keyword"
                                                    className="ui-autocomplete-input flex-grow-1"
                                                    autoComplete="off"
                                                    value={searchKeyword}
                                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                                />
                                                <input type="hidden" id="searchhidden" />
                                                <button type="submit" title="Search" id="searchbizAction">
                                                    <i className="bi bi-search bi-search2"></i>
                                                </button>
                                            </form>
                                        </div>
                                        <button type="button" className="btn btn-outline-primary allbtn ml-2 allbtn2" id="searchAllbusiness" onClick={() => setSearchKeyword("")}>
                                            <i className="ri-building-line"></i> 전체수임기업
                                        </button>
                                    </div>
                                </li>
                                <li className="nav-item-divider"></li>
                                <br />
                                <li className="nav-item" id="businessList">
                                    <div className="list-group">
                                        {filteredBusinesses.map((business) => (
                                            <a
                                                href="#"
                                                className="list-group-item list-group-item-action"
                                                key={business.id}
                                            >
                                                <input type="hidden" name="biznoInSidebar" value={business.id} />
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{business.name}</h5>
                                                    <i className="bi bi-bell"></i>
                                                </div>
                                                <span className="badge biztype">{business.type}</span>
                                                <small className="text-muted">{business.registrationNumber}</small>
                                            </a>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>





            </div>


        </>
    );
}

export default HomeTABody;