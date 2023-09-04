import React from 'react';
import { Modal } from 'react-bootstrap';


const DocrequestCODAModal = ({ show, closeModal }) => {
    return (
        <>

            <Modal show={show} onHide={closeModal} style={{ '--bs-modal-width': '750px' }} >
                <Modal.Header closeButton>
                    <Modal.Title><strong>민원서류 발급신청</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="modaltable">
                            <div className="card-body">
                                <h5 className="card-title">민원서류 신청서</h5>

                                {/* General Form Elements  */}
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-2 col-form-label">회사담당자</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" value="김성민" readOnly name="member.membername" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">신청서류</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" name="doctype">
                                            <option value="">신청 서류 선택</option>
                                            <option value="사업자등록신청서">사업자등록신청서</option>
                                            <option value="사업자등록증재교부신청서">사업자등록증재교부신청서</option>
                                            <option value="사업자등록정정신고서">사업자등록정정신고서</option>
                                            <option value="휴폐업신고서">휴폐업신고서</option>
                                            <option value="총괄납부승인">총괄납부승인.변경.포기신청</option>
                                            <option value="간이과세적용신청.포기신고서">간이과세적용신청.포기신고서</option>
                                            <option value="면세적용신청.포기신고서">면세적용신청.포기신고서</option>
                                            <option value="부가세과표.면세수입금액 확인">부가세과표.면세수입금액 확인</option>
                                            <option value="제무재표등 확인">제무재표등 확인</option>
                                            <option value="납세증명서">납세증명서</option>
                                            <option value="원천징수이행상황신고서 확인">원천징수이행상황신고서 확인</option>
                                            <option value="소득금액확인">소득금액확인</option>
                                            <option value="사실증명">사실증명</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">신청 서류 기간</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" name="doctagetdate">
                                            <option value="">신청 서류 기간 선택</option>
                                            <option value="2018-01-01">2018-01-01 ~ 2018-12-31</option>
                                            <option value="2019-01-01">2019-01-01 ~ 2019-12-31</option>
                                            <option value="2020-01-01">2020-01-01 ~ 2020-12-31</option>
                                            <option value="2021-01-01">2021-01-01 ~ 2021-12-31</option>
                                            <option value="2022-01-01">2022-01-01 ~ 2022-12-31</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">부수</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" name="count">
                                            <option value="">부수 선택</option>
                                            <option value="1부">1부</option>
                                            <option value="2부">2부</option>
                                            <option value="3부">3부</option>
                                            <option value="4부">4부</option>
                                            <option value="5부">5부</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">용도</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" name="purpose">
                                            <option value="">용도 선택</option>
                                            <option value="금융기관 제출용">금융기관 제출용</option>
                                            <option value="공공기관 제출용">공공기관 제출용</option>
                                            <option value="기타">기타</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputDate" className="col-sm-2 col-form-label">발급 희망일자</label>
                                    <div className="col-sm-10">
                                        <input type="date" className="form-control" name="wishdate" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">발급방법</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example" name="way">
                                            <option value="">발급방법 선택</option>
                                            <option value="온라인발급(PDF)">온라인발급(PDF)</option>
                                            <option value="온라인발급(전자문서지갑)">온라인발급(전자문서지갑)</option>
                                            <option value="오프라인발급(FAX)">오프라인발급(FAX)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label"></label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value="발급완료 시, 발급내역에서 PDF파일로 확인 가능합니다."
                                            disabled
                                            />
                                    </div>
                                </div>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">주민(법인)등록번호공개 여부</legend>
                                    <div className="col-sm-10">
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                                <label className="form-check-label" htmlFor="gridRadios1"> 공개 </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                                <label className="form-check-label" htmlFor="gridRadios2"> 비공개 </label>
                                            </div>
                                        </div>
                                        <div>
                                            <strong style={{ color: '#4154f1' }}>(비공개시 출력 예 : 950101-1******)</strong>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                        <button type="submit" className="btn btn-primary">확인</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DocrequestCODAModal;
