import 'react-tooltip/dist/react-tooltip.css'
import React, { useState, useEffect } from 'react';
import { Tooltip } from "react-tooltip";
import ModalReqMemo from './ModalReqMemo';
import { useDispatch, useSelector } from 'react-redux';
import { setBanks, setRequestWhat } from '../../redux/bankSlice';
import axios from 'axios';
import ModalWriteMemo from './ModalWriteMemo';

// 은행 내역
// banks 은행내역정보와 사용자가 선택한 탭 정보 activeTabs 파라미터로 받아서
// 탭 정보에 맞는 것만 출력
const BankbookTable = ({ banks, activeTab, requestFrom }) => {

	// 선택한 탭에 따라 걸러질 은행 내역
	let filteredBanks = banks;
	// 전체 체크 여부
	const [checkAll, setCheckAll] = useState(false);
	// 모달 표시 여부
	const [showModal, setShowModal] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
	// 사용자가 체크한 은행 내역
	const [selectedBanks, setSelectedBanks] = useState([]);
	// 리덕스 함수 사용 위한 dispatch 생성
	const dispatch = useDispatch();


	if (activeTab === "bankconn") {
		filteredBanks = banks.filter((bank) => bank.bhstatename !== "미연결");
	}

	if (activeTab === "banknone") {
		filteredBanks = banks.filter((bank) => bank.bhstatename === "미연결");
	}

	// 모달 열기
	const openModal = () => {
		setShowModal(true);
	}
	// 모달 닫기
	const closeModal = () => {
		setShowModal(false);
	}

  // 메모 모달 열기
  const openMemoModal = () => {
    setShowMemoModal(true);
  }

  // 메모 모달 닫기
  const closeMemoModal = () => {
    setShowMemoModal(false);
  }

	// 전체 체크 -> 탭 변경시 false 초기화
	useEffect(()=>{
		setCheckAll(false);
	}, [activeTab]);

	// 전체 체크or해제 시 은행 내역 변경
	const handleCheckAllChange = () => {
		setCheckAll(!checkAll);
	}

	//checkAll 변경할 때마다 SelectedBanks 변경
	useEffect(()=>{
		if(checkAll){
			setSelectedBanks(filteredBanks);
		}else{
			setSelectedBanks([]);
		}
	}, [checkAll]);

	// 체크박스 체크or해제
	const handleCheckChange = (bank) => {
		if(selectedBanks.includes(bank)){
			// 사용자가 체크해서 넣은 은행내역이라면 빼기
			setSelectedBanks(selectedBanks.filter((selected)=>selected!==bank));
		}else{
			setSelectedBanks([...selectedBanks, bank]);
		}

    console.log("체크한 은행**************: " + selectedBanks);
	}
	
	// 전표입력 클릭 시 리덕스의 setBanks 함수 -> 선택한 은행 내역 넘겨주기
	const sendBankInfo = () => {
    dispatch(setRequestWhat("write"));
		dispatch(setBanks(selectedBanks));
	}

	// 분개내역조회 클릭 시 선택한 은행 내역의 코드 확인해 분개전표 가져오기
	const showSlipDetail = () => {
    dispatch(setRequestWhat("show"));
    dispatch(setBanks(selectedBanks));
	}

	return (

		<div>
			<div className="banklogo">
				<img src="/img/shinhan.png" alt="Shinhan Bank" width="20" height="20" />
				<button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					신한은행
				</button>
				<ul className="dropdown-menu">
					<li><a className="dropdown-item" href="javascript:void(0);">국민은행</a></li>
					<li><a className="dropdown-item" href="javascript:void(0);">우리은행</a></li>
					<li><a className="dropdown-item" href="javascript:void(0);">농협은행</a></li>
					<li><a className="dropdown-item" href="javascript:void(0);">SC제일은행</a></li>
					<li><a className="dropdown-item" href="javascript:void(0);">KEB하나은행</a></li>
				</ul>
			</div>
			<table id="allbanktable" className="banktable table table-hover table-bordered">
				<thead>
					<tr>
						<th scope="col" className="tabletop">
							<input 
								className="form-check-input" 
								type="checkbox"
								checked={checkAll}
								onChange={()=>handleCheckAllChange()}
							/>
						</th>
						<th scope="col" className="tabletop">날짜</th>
						<th scope="col" className="tabletop">적요</th>
						<th scope="col" className="tabletop">입금액</th>
						<th scope="col" className="tabletop">출금액</th>
						<th scope="col" className="tabletop">잔액</th>
						<th scope="col" className="tabletop">메모</th>
					</tr>
				</thead>
				<tbody>
					{
						// 날짜 기준 역순 출력
            //.sort((a, b) => new Date(b.bhdate) - new Date(a.bhdate)) 에러
            filteredBanks &&
						filteredBanks
							.map((bank) => {
                let formattedDate = new Intl.DateTimeFormat('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(bank.bhdate)).replace(/\//g, '-');
                let formattedAmount = bank.amount.toLocaleString('en-US');
                let formattedSum = bank.sum.toLocaleString('en-US');

								return (
									<tr key={bank.bhno}>
										<td>
											<input
												className="form-check-input"
												type="checkbox"
												// 그냥 checked={checkAll}로 적으면
												// 개별 체크 시 화면에 렌더링 되지 않음
												// ... -> 객체의 속성을 복사하고 붙여넣는 역할
												{...(checkAll ? {checked:"checked"} : "")}
												onChange={()=>handleCheckChange(bank)}
											/>
										</td>
										<td>{formattedDate}</td>
										<td>{bank.source}</td>
                    {
                      bank.sortno==1 ? (
                        <>
                          <td>{formattedAmount}</td>
                          <td></td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td>{formattedAmount}</td>
                        </>
                      )
                    }
										<td>{formattedSum}</td>
										<td>
											<Tooltip
												id="memotooltip"
												place="top"
												effect="solid"
											/>
											{
												bank.memo !== null ?
												(
													<a href="#"
														data-tooltip-id="memotooltip"
														data-tooltip-content={bank.memo}
													>
														<i className="ri-article-fill"></i>
													</a>
												) : <i className="ri-article-fill"></i>
											}
										</td>
									</tr>
								)
							})
					}
				</tbody>
			</table>

			{ (requestFrom==='ta' && activeTab === 'banknone') &&
				<div>
					<button
						type="button"
						id="bankslipplzbtn"
						className="btn btn-primary btn-small btnmarginright"
						onClick={()=>sendBankInfo()}
					>
						전표입력
					</button>
					<button
						type="button"
						id="memoplzbtn"
						className="btn btn-primary btn-small"
						onClick={()=>openModal()}
					>
						내용확인요청
					</button>
				</div>
			}

			{ (requestFrom==='ta' && activeTab === 'bankconn') &&
				<div>
					<button
						type="button"
						id="watchslipbtn"
						className="btn btn-primary btn-small"
						onClick={()=>showSlipDetail()}
					>
						분개내역조회
					</button>
				</div>
			}

      { (requestFrom==='co' && (activeTab === 'bankconn' || activeTab === 'banknone')) &&
				<div>
					<button
						type="button"
						id="watchslipbtn"
						className="btn btn-primary btn-small"
						onClick={()=>openMemoModal()}
					>
						메모입력
					</button>
				</div>
			}

      { // 모달 상태에 따라 모달 렌더링
				showModal &&
				<ModalReqMemo 
					openModal={openModal} 
					closeModal={closeModal}
					selectedBanks={selectedBanks}
				/>
			}
      {
        // 메모 입력 모달
        showMemoModal &&
        <ModalWriteMemo
          openModal={showMemoModal}
          closeModal={closeMemoModal}
          selectedBanks={selectedBanks}
        />
      }
		</div>
	);
}

export default BankbookTable;
