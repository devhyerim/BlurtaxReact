import { React, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


const InfoCO = () => {
    

    const [data, setData] = useState({

        labels: ['금융소득', '사업소득', '근로소득', '연금소득', '기타소득'],
        datasets: [
            {
                label: '결정 세액',
                data: [0, 4500000, 0, 0, 0],
                backgroundColor: '#e9ecef',
            },
            {
                label: '종합 소득 금액',
                data: [0, 50000000, 0, 0, 0],
                backgroundColor: '#0d6efd',
            },
        ],
    })

    const [options, setOptions] = useState({
        plugins: {
            title: {
                display: false,
                text: '종합소득 세목별 보기',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    });
    
    const barClick = (e) => {
        e.preventDefault();
        alert('올해의 사업소득 금액은 0원 입니다.');
    }

    useEffect(() => {
      }, []);


    return (
        <body>
            <main id="main" className="main nonsidebar mt-3">
                <div className="pagetitle">
                    <h1>신고/납부 현황</h1>
                </div>
                <br />
                <section className="section dashboard">
                    <div className="card">
                        <div className="card-body">
                            <br />
                            <ul className="nav nav-tabs nav-tabs-bordered" id="borderedTab"
                                role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab"
                                        data-bs-toggle="tab" data-bs-target="#bordered-home"
                                        type="button" role="tab" aria-controls="home"
                                        aria-selected="true">종합소득세</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#bordered-profile" type="button" role="tab"
                                        aria-controls="profile" aria-selected="false">부가가치세</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#bordered-contact" type="button" role="tab"
                                        aria-controls="contact" aria-selected="false">사업장현황</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#bordered-contact" type="button" role="tab"
                                        aria-controls="contact" aria-selected="false">법인세</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#bordered-contact" type="button" role="tab"
                                        aria-controls="contact" aria-selected="false">원천세</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#bordered-contact" type="button" role="tab"
                                        aria-controls="contact" aria-selected="false">지방소득세</button>
                                </li>
                            </ul>
                            <div className="tab-content pt-2" id="borderedTabContent">
                                <div className="tab-pane fade show active" id="bordered-home"
                                    role="tabpanel" aria-labelledby="home-tab">
                                    <table className="table table-hover table-bordered">

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                신고서 한눈에 보기 <span>| Month</span>
                                            </h5>
                                            <div className="detailTitle">
                                                <span></span> <span></span> <span></span>
                                            </div>

                                            <div className="activity">

                                                <div className="activity-item d-flex">
                                                    <div className="activite-label">32 min</div>
                                                    <i
                                                        className="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
                                                    <div className="activity-content">
                                                        종합소득세 <a href="#" className="fw-bold text-dark">과세표준확정신고 및 납부계산서</a>
                                                    </div>
                                                    <div className="details">
                                                        <span className="biznincome"></span> <span className="tax"></span> <span className="reportdate"></span>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>

                                    </table>

                                </div>


                            </div>

                            <div className="card container">
                                <div className="card-body p-5">
                                    <h5 className="card-title">종합소득 세목별 보기</h5>

                                    <Bar data={data} options={options} onClick={barClick}/>
                                </div>
                            </div>




                        </div>
                    </div>
                </section>


            </main>
        </body>
    );
}

export default InfoCO;