import '../../resources/assets/vendor/remixicon/remixicon.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedBizno } from '../../redux/bankSlice';
import Pagination from './Pagination';

const Sidebar = () => {

  // 기업 검색어 변수
  const [searchBiz, setSearchBiz] = useState('');
  // 기업 리스트
  const [business, setBusiness] = useState([]);
  // 선택된 기업 (색상 관리)
  const [selectedBiz, setSelectedBiz] = useState(null);
  
  const dispatch = useDispatch();

  // 검색 함수
  const onSearch = (e) => {
    if(e.key=='Enter'){
      getBusiness(1);
    }
  }

  // 전체 수임기업 조회
  const showAllBiz = () => {
    setSearchBiz(''); // 검색어 초기화
    getBusiness(1);
  }

  //--------------- 페이지네이션 ------------------------
  // 사용자가 클릭한 현재 페이지 값
  const [currentPage, setCurrentPage] = useState(1);
  // 총 기업 개수
  const [numberOfBizs, setNumberOfBizs] = useState(0);
  // 총 페이지 수
  const [numberOfPages, setNumberOfPages] = useState(0);
  // 한 페이지에 보여줄 기업 수
  const limit = 5;

  // 총 페이지 수 계산: 기업수에 따라 변경되므로 의존성 배열에 넣기
  useEffect(()=>{
    setNumberOfPages(Math.ceil(numberOfBizs/limit));  // 반올림
  }, [numberOfBizs]);

  // 기업 리스트 가져오는 함수
  const getBusiness = (page = 1) => {
    setCurrentPage(page);

    let params = {bizname: searchBiz}

    /*
    let params = {
      bizname_like: searchBiz,
      _page: page,
      _limit: limit
    }
    */

    axios.get('http://localhost:8081/common/getBizList', { params }).then((res) => {
      // 네트워크 헤더로부터 가져온 총 기업 수
      setNumberOfBizs(res.headers['x-total-count']);
      setBusiness(res.data);
    });
  }

  // 기업 클릭시
  const clickBiz = ((bizno)=>{
      setSelectedBiz(bizno);
      dispatch(setSelectedBizno(bizno));
  });

  useEffect(() => {
    getBusiness();
  }, [searchBiz]);  // searchBiz를 꼭 의존성배열에 추가해야함!!!

  //----------------------------------------------------

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <div className="search-bar bizsearch search-form d-flex align-items-center search-biz">
            <input
              type="text"
              name="bizname"
              id="searchbusiness"
              placeholder="수임기업명을 검색하세요"
              value={searchBiz}
              onChange={(e) => setSearchBiz(e.target.value)}
              onKeyUp={onSearch}
            />
            <input type="hidden" id="searchhidden" />
            <button type="button" title="Search" id="searchbizAction"><i className="bi bi-search"></i></button>
          </div>
          <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
              <li className="nav-item d-block d-lg-none">
                <a className="nav-link nav-icon search-bar-toggle" href="#">
                  <i className="bi bi-search"></i>
                </a>
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className="btn btn-outline-primary allbtn"
            id="searchAllbusiness"
            onClick={()=>{showAllBiz()}}
          >
            <i className="ri-building-line"></i> 전체수임기업
          </button>
          <br /><br />
        </li>
        <li className="nav-item-divider"></li>
        <br />
        <li className="nav-item" id="businessList">
          <div 
            className="list-group"
          >
            { business.length > 0 && // 기업 리스트가 비어있지 않은 경우만 렌더링
              business.map((biz) => {
                return (
                  <a href="#"
                    className={`list-group-item list-group-item-action
                    ${selectedBiz===biz.bizno ? 'selected' : ''}`}
                    key={biz.bizno}
                    onClick = {()=> clickBiz(biz.bizno)}
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        {biz.bizname}
                      </h5>
                      <i class="bi bi-bell"></i>
                    </div>
                    <span className="badge biztype">{biz.industry}</span>
                    <small class="text-muted">{biz.businesslicense}</small>
                  </a>
                )
              })
            }
          </div>
        </li>
      </ul>
      {
        numberOfPages>1 &&
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={getBusiness}
        />
      }
    </aside>
  );
}

export default Sidebar;