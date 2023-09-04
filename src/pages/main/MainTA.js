import '../../resources/assets/css/main.css';

const MainTA = () => {
  return(
    <div>

      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="#" className="logo d-flex align-items-center">
                  <img src="/img/logo.png" alt=""/>
                  <span className="d-none d-lg-block">BlurTax</span>
                  <span className="d-none d-lg-block">.</span>
                </a>

                <ul className="nav">
                  <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                  <li className="scroll-to-section"><a href="#services">세무회계사무소</a></li>
                  <li className="scroll-to-section"><a href="#about">수임고객</a></li>
                  <li className="scroll-to-section"><a href="#pricing">서비스소개</a></li>
                  <li className="scroll-to-section"><a href="#newsletter">요금안내</a></li>
                  <li><div className="gradient-button"><a id="modal_trigger" href="/main/talogin"><i className="fa fa-sign-in-alt"></i> 로그인</a></div></li> 
                </ul>        
                <a className='menu-trigger'>
                    <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <div className="row">
                      <div className="col-lg-12">
                        <h2>세무회계사무소의</h2>
                        <h2>혁신적인 업무환경을 위하여</h2>
                        <h2 style={{color: "white"}}>BlurTax.</h2>
                        <p style={{color: "white"}}>회계프로그램을 넘어 RPA기술로 세무회계사무소의 4차 업무 혁명을 가져다줄 BlurTax.</p>
                      </div>
                      <div className="col-lg-12">
                        <div className="white-button first-button scroll-to-section">
                          <a href="#contact">다운로드 <i className="fab fa-apple"></i></a>
                        </div>
                        <div className="white-button scroll-to-section">
                          <a href="#contact">다운로드 <i className="fab fa-google-play"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img src="/img/about-right-dec.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" className="services section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
                <h4>세무회계사무소와 수임고객이<br/> <em>BlurTax &amp; BlurTax edge</em> 로 연결됩니다</h4>
                <img src="/img/heading-line-dec.png" alt=""/>
                <p>BlurTax edge는 우리회사의 자금, 매입/매출, 통장 입/출금 등 경영현황 파악부터 담당 세무대리인과의 직접소통까지 다양한 기능을 제공하는 수임기업 맞춤 서비스입니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="service-item first-service">
                <div className="icon"></div>
                <h4>민원·증명서류 신청/발급</h4>
                <p>수임고객이 신청한 서류를 실시간 확인하여 바로 발급하고, 발급된 서류 보관 관리</p>
                <div className="text-button">
                  <a href="#">더 알아보기 <i className="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item second-service">
                <div className="icon"></div>
                <h4>편리한 증빙전표처리</h4>
                <p>수임고객이 증빙영수증을 촬영하여 전송하면 실시간 확인과 편리한 전표처리까지</p>
                <div className="text-button">
                  <a href="#">더 알아보기 <i className="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item third-service">
                <div className="icon"></div>
                <h4>통장 화면공유</h4>
                <p>내용 파악이 어려웠던 통장내역을 화면공유로 함께 확인하고 바로 처리</p>
                <div className="text-button">
                  <a href="#">더 알아보기 <i className="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="service-item fourth-service">
                <div className="icon"></div>
                <h4>신고결과 실시간 전송</h4>
                <p>임고객에게 신고완료 알림 전송 신고서, 납부서, 접수증도 언제 어디서든 즉시 확인</p>
                <div className="text-button">
                  <a href="#">더 알아보기 <i className="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="pricing-tables">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading">
                <h4>세무회계사무소에게 필요한 업무환경을 <em>BlurTax</em> 에서 만나보세요</h4>
                <img src="/img/heading-line-dec.png" alt=""/>
                <p>BlurTax에 가입하지 않은 수임고객의 기장업무도 무료로 지원할 수 있습니다.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-regular">
                <span className="price"></span>
                <h4>Standard Plan</h4>
                <div className="icon">
                  <img src="/img/pricing-table-01.png" alt=""/>
                </div>
                <ul>
                  <li>한눈에 확인하는 수임고객별 업무현황</li>
                  <li>실시간 기장진도 현황 및 신고현황 조회</li>
                  <li>간편한 민원서류/증명서류 발급 및 전송</li>
                  <li>강화된 자동분개 추천 및 수임고객과의 통장내역 공유</li>
                  <li className="non-function">빅데이터 분석을 통한 사업분석보고서 자동생성</li>
                  <li className="non-function">효율적인 업무를 위한 일정/할일 관리</li>
                </ul>
                <div className="border-button">
                  <a href="#">요금제 확인하기</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-pro">
                <span className="price"></span>
                <h4>Business Plan</h4>
                <div className="icon">
                  <img src="/img/pricing-table-01.png" alt=""/>
                </div>
                <ul>
                  <li>한눈에 확인하는 수임고객별 업무현황</li>
                  <li>실시간 기장진도 현황 및 신고현황 조회</li>
                  <li>간편한 민원서류/증명서류 발급 및 전송</li>
                  <li>강화된 자동분개 추천 및 수임고객과의 통장내역 공유</li>
                  <li>빅데이터 분석을 통한 사업분석보고서 자동생성</li>
                  <li>효율적인 업무를 위한 일정/할일 관리</li>
                </ul>
                <div className="border-button">
                  <a href="#">요금제 확인하기</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-item-regular">
                <span className="price"></span>
                <h4>Free for BlurTax edge</h4>
                <div className="icon">
                  <img src="/img/pricing-table-01.png" alt=""/>
                </div>
                <ul>
                  <li>우리회사 담당 세무대리인과의 대화방</li>
                  <li>한눈에 보는 우리회사 경영/자금현황</li>
                  <li>간편한 증빙이미지 전송</li>
                  <li>쉽고 빠른 민원서류/증명서 신청</li>
                  <li>신고서 및 기타 문서를 보관하는 문서고</li>
                  <li>급여명세, 연말정산, 근로계약 등 모바일과 연계되는 인사관리</li>
                </ul>
                <div className="border-button">
                  <a href="#">정보 더 확인하기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <footer id="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="section-heading">
                <h4>메일로 최신 세무&amp;회계 정보를 받아보세요!</h4>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-3">
              <form id="search" action="#" method="GET">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <fieldset>
                      <input type="address" name="address" className="email" placeholder="이메일 주소를 입력하세요" autocomplete="on" required/>
                    </fieldset>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <fieldset>
                      <button type="submit" className="main-button">구독하기 <i className="fa fa-angle-right"></i></button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>BlurTax 도입 문의</h4>
                <p><a href="#">02-475-9305</a></p>
                <p><a href="#">bluesae@blurtax.co.kr</a></p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>프로그램 소개</h4>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">세무회계사무소</a></li>
                  <li><a href="#">수임고객</a></li>
                  <li><a href="#">서비스소개</a></li>
                  <li><a href="#">요금안내</a></li>
                </ul>
                <ul>
                  <li><a href="#">컨설팅/비즈니스</a></li>
                  <li><a href="#">협업서비스</a></li>
                  <li><a href="#">부가서비스</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>관련 링크</h4>
                <ul>
                  <li><a href="#">앱 다운로드</a></li>
                  <li><a href="#">세무/회계 정보</a></li>
                  <li><a href="#">최신 뉴스</a></li>
                </ul>
                <ul>
                  <li><a href="#">매출채권팩토링 정보</a></li>
                  <li><a href="#">서비스 마켓</a></li>
                  <li><a href="#">CRM</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget">
                <h4>About BlurTax</h4>
                <p>안전한 보안관리, 전사적 자원관리, 클라우드 빅데이터 인프라를 기반으로 언제 어디서나 접속할 수 있고, 믿을 수 있는 업무환경을 제공합니다.</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="copyright-text">
                <p>
                  Copyright © 2023 BlurTax Company. All Rights Reserved. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainTA;