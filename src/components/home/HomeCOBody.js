import * as React from 'react';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import { Carousel } from 'react-bootstrap';

const HomeCOBody = () => {

    const chartOptions = {
        series: [
          {
            name: '매출액',
            data: [31, 40, 28, 51, 42, 82, 56],
          },
          {
            name: '영업이익률',
            data: [11, 32, 45, 32, 34, 52, 41],
          },
          {
            name: '순이익률',
            data: [15, 11, 32, 18, 9, 24, 11],
          },
        ],
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        markers: {
          size: 4,
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.4,
            stops: [0, 90, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2023-01-01',
            '2023-02-01',
            '2023-03-01',
            '2023-04-01',
            '2023-05-01',
            '2023-06-01',
            '2023-07-01',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy',
          },
        },
      };

      const chartOptions2 = {
        chart: {
            id: 'horizontal-bar',
          },
        xaxis: {
          categories: ['세금', '매출량'], // y축에 카테고리 설정
        },
        plotOptions: {
            bar: {
              horizontal: true,
            }
          },
      };
      
      const chartSeries = [
        {
            name: '2022',
            data: [131744, 630230]
          },
          {
            name: '2023',
            data: [134141, 681807]
          }
      ];

      const activities = [
        {
          time: '32 min',
          color: 'success',
          description: '회사의 부가세과표.면세수입금액 확인',
          link: '/docrequest/docrequestCO',
          action: '민원 서류 신청',
        },
        {
          time: '56 min',
          color: 'danger',
          description: '회사의 영수증',
          link: '/receipt/receiptco',
          action: '증빙 전표 신청',
        },
        {
          time: '2 hrs',
          color: 'primary',
          description: '법인세 신고서 작성을 위한 재무 데이터 수집 및 검토',
        },
        {
          time: '1 day',
          color: 'info',
          description: '회사의 종합소득세 신고 완료',
          link: '/info/infoCO',
          action: '종합소득세 신고',
        },
        {
          time: '2 days',
          color: 'info',
          description: '국민 은행 통장내역 전표처리 완료',
          link: '/bank/bankco',
          action: '통장내역 전표처리',
        },
        {
          time: '2 days',
          color: 'warning',
          description: '회사의 자산 관리를 위해 고정자산 목록 작성 및 갱신',
        },
        {
          time: '1 week',
          color: 'warning',
          description: '기존 전표 업로드 완료',
        },
        {
          time: '4 weeks',
          color: 'text-muted',
          description: '기본 통장, 카드 인증서 등록 완료',
        },
        {
          time: '4 weeks',
          color: 'text-muted',
          description: '그린테크 기업 BlurTax 가입',
        },
      ];



    return (
        <>
            <div className="row">
                <div className="row row2">

                    {/* Customers Card */}
                    <div className="col-xxl-4 col-xl-12 login">

                        <div className="card info-card customers-card cardf">

                            <div className="card-body ">
                                <h5 className="card-title">그린테크소프트<span> | 수임사</span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6>김성민</h6>
                                        <span className="text-danger small pt-1 fw-bold">대표님</span> <span className="text-muted small pt-2 ps-1">sungmin@naver.com</span>
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
                                                src={process.env.PUBLIC_URL + '/img/mainbn1.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 1"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/img/mainbn2.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 2"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/img/mainbn3.jpg'}
                                                style={{ height: '170px', borderRadius: '5px' }}
                                                alt="Slide 3"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src={process.env.PUBLIC_URL + '/img/mainbn4.jpg'}
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
                    <Link to="/docrequest/docrequestco">
                            <div className="service-item first-service">
                                <div className="icon"></div>
                                <h4>민원 서류</h4>
                                <p>원하는 서류 실시간 확인 발급</p>
                            </div>
                    </Link>
                        </div>

                        <div className="col-lg-3">
                        <Link to="/receipt/receiptco">
                            <div className="service-item second-service">
                                <div className="icon"></div>
                                <h4>전표증빙</h4>
                                <p>영수증 촬영으로 편리한 전표처리</p>
                            </div>
                        </Link>
                        </div>

                        <div className="col-lg-3">
                        <Link to="/bank/bankco">
                            <div className="service-item third-service">
                                <div className="icon"></div>
                                <h4>통장 관리</h4>
                                <p>편리한 자동분개와 내용 확인</p>
                            </div>
                        </Link>
                        </div>

                        <div className="col-lg-3">
                        <Link to="/info/infoco">
                            <div className="service-item fourth-service">
                                <div className="icon"></div>
                                <h4>신고현황</h4>
                                <p>즉시 확인 가능한 신고서, 납부서</p>
                            </div>
                        </Link>
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
                    <h5 className="card-title">이익률 분석 <span>/ 상반기</span></h5>
                    <div> 
                        <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={350} />
                    </div>
                    <h5 className="card-title">기업 매출 & 세금 현황</h5>
                    <div>
                    <ApexCharts
                        options={chartOptions2}
                        series={chartSeries}
                        type="bar"
                        height={350}
                        />
                    </div>
                </div>



            </div>


        </>
    );
}

export default HomeCOBody;