import '../../resources/assets/css/main.css';

const MainCO = () => {
  return(
    <div>
      <div id="js-preloader" class="js-preloader">
        <div class="preloader-inner">
          <span class="dot"></span>
          <div class="dots">
            <span></span> <span></span> <span></span>
          </div>
        </div>
      </div>

      <header class="header-area header-sticky wow slideInDown"
        data-wow-duration="0.75s" data-wow-delay="0s">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <nav class="main-nav">
                <a href="#" class="logo d-flex align-items-center"> 
                  <img
                  src="/img/logo.png" alt=""/> <span
                  class="d-none d-lg-block">BlurTax</span> <span class="edge">edge</span>
                </a>

                <ul class="nav">
                  <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
                  <li class="scroll-to-section"><a href="#services">세무회계사무소</a></li>
                  <li class="scroll-to-section"><a href="#about">수임고객</a></li>
                  <li class="scroll-to-section"><a href="#pricing">서비스소개</a></li>
                  <li class="scroll-to-section"><a href="#newsletter">요금안내</a></li>
                  <li><div class="gradient-button">
                      <a id="modal_trigger" href="/main/cologin"><i class="fa fa-sign-in-alt"></i> 로그인</a>
                    </div></li>
                </ul>
                <a class='menu-trigger'> <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s"
        data-wow-delay="0.5s">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-6 align-self-center">
                  <div class="left-content show-up header-text wow fadeInLeft"
                    data-wow-duration="1s" data-wow-delay="1s">
                    <div class="row">
                      <div class="col-lg-12">
                        <h2>세무·회계 수임 기업 전용</h2>
                        <h2 style={{color: "white"}}>BlurTax edge</h2>
                        <p style={{color: "white"}}>우리회사와 다양한 분야의 전문가들이 연계된 서비스를
                          BlurTax edge에서 만나보세요.</p>
                      </div>
                      <div class="col-lg-12">
                        <div class="white-button first-button scroll-to-section">
                          <a href="#contact">다운로드 <i class="fab fa-apple"></i></a>
                        </div>
                        <div class="white-button scroll-to-section">
                          <a href="#contact">다운로드 <i class="fab fa-google-play"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="right-image wow fadeInRight" data-wow-duration="1s"
                    data-wow-delay="0.5s">
                    <img src="/img/slider-dec.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="services" class="services section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="section-heading  wow fadeInDown" data-wow-duration="1s"
                data-wow-delay="0.5s">
                <h4>
                  세무회계사무소와 수임고객이<br/> <em>BlurTax &amp; BlurTax edge</em> 로
                  연결됩니다
                </h4>
                <img src="/img/heading-line-dec.png" alt=""/>
                <p>BlurTax edge는 우리회사의 자금, 매입/매출, 통장 입/출금 등 경영현황 파악부터 담당
                  세무대리인과의 직접소통까지 다양한 기능을 제공하는 수임기업 맞춤 서비스입니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="service-item first-service">
                <div class="icon"></div>
                <h4>민원·증명서류 신청/발급</h4>
                <p>수임고객이 신청한 서류를 실시간 확인하여 바로 발급하고, 발급된 서류 보관 관리</p>
                <div class="text-button">
                  <a href="#">더 알아보기 <i class="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item second-service">
                <div class="icon"></div>
                <h4>편리한 증빙전표처리</h4>
                <p>수임고객이 증빙영수증을 촬영하여 전송하면 실시간 확인과 편리한 전표처리까지</p>
                <div class="text-button">
                  <a href="#">더 알아보기 <i class="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item third-service">
                <div class="icon"></div>
                <h4>통장 화면공유</h4>
                <p>내용 파악이 어려웠던 통장내역을 화면공유로 함께 확인하고 바로 처리</p>
                <div class="text-button">
                  <a href="#">더 알아보기 <i class="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="service-item fourth-service">
                <div class="icon"></div>
                <h4>신고결과 실시간 전송</h4>
                <p>수임고객에게 신고완료 알림 전송 신고서, 납부서, 접수증도 언제 어디서든 즉시 확인</p>
                <div class="text-button">
                  <a href="#">더 알아보기 <i class="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="newsletter">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <div class="section-heading">
                <h4>메일로 최신 세무&amp;회계 정보를 받아보세요!</h4>
              </div>
            </div>
            <div class="col-lg-6 offset-lg-3">
              <form id="search" action="#" method="GET">
                <div class="row">
                  <div class="col-lg-6 col-sm-6">
                    <fieldset>
                      <input type="address" name="address" class="email"
                        placeholder="이메일 주소를 입력하세요" autocomplete="on" required/>
                    </fieldset>
                  </div>
                  <div class="col-lg-6 col-sm-6">
                    <fieldset>
                      <button type="submit" class="main-button">
                        구독하기 <i class="fa fa-angle-right"></i>
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3">
              <div class="footer-widget">
                <h4>BlurTax edge 도입 문의</h4>
                <p>
                  <a href="#">02-475-9302</a>
                </p>
                <p>
                  <a href="#">bluebird@blurtax.co.kr</a>
                </p>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="footer-widget">
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
            <div class="col-lg-3">
              <div class="footer-widget">
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
            <div class="col-lg-3">
              <div class="footer-widget">
                <h4>About BlurTax edge</h4>
                <p>안전한 보안관리, 전사적 자원관리, 클라우드 빅데이터 인프라를 기반으로 언제 어디서나 접속할 수 있고,
                  믿을 수 있는 업무환경을 제공합니다.</p>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="copyright-text">
                <p>Copyright © 2023 BlurTax Company. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainCO;