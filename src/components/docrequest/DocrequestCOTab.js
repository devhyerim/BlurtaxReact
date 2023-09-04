import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DocrequestCORModal from './DocrequestCORModal';
import DocrequestCOCKModal from './DocrequestCOCKModal';

const DocrequestCOTab = () => {
  const [show1, setShow1] = useState(false);

  const openModal1 = () => setShow1(true);
  const closeModal1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);

  const openModal2 = () => setShow2(true);
  const closeModal2 = () => setShow2(false);


  return (
    <>
      <section className="section dashboard">
        <div className="card">
          <div className="card-body">
            <Tab.Container id="myTab" defaultActiveKey="home">
              {/* Default Tabs */}
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="home">발급신청</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="profile">발급완료</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  {/* Table with hoverable rows */}
                  <div className="pt-2">
                    <table className="table table-hover">
                      {/* 테이블 내용 추가 */}
                      <thead>
                        <tr>
                          <th scope="col" class="tabletop">발급신청자1</th>
                          <th scope="col" class="tabletop">신청서류</th>
                          <th scope="col" class="tabletop">발급희망일</th>
                          <th scope="col" class="tabletop">용도 및 제출처</th>
                          <th scope="col" class="tabletop">발급상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">membername</td>

                          <td><b>doctype</b>[count]</td>

                          <td>wishdate</td>

                          <td>docreq.purpose</td>

                          <td>drstatename</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* End Table with hoverable rows */}
                </Tab.Pane>
                <Tab.Pane eventKey="profile">
                  {/* Table with hoverable rows */}
                  <div className="pt-2">
                    <table className="table table-hover">
                      {/* 테이블 내용 추가 */}
                      <thead>
                        <tr>
                          <th scope="col" class="tabletop">발급신청자2</th>
                          <th scope="col" class="tabletop">신청서류</th>
                          <th scope="col" class="tabletop">발급희망일</th>
                          <th scope="col" class="tabletop">용도 및 제출처</th>
                          <th scope="col" class="tabletop">발급상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td scope="row">membername</td>

                          <td><b>doctype</b>[count]</td>

                          <td>wishdate</td>

                          <td>docreq.purpose</td>

                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-primary request"
                              onClick={openModal1}
                            >수신하기
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td scope="row">membername</td>

                          <td><b>doctype</b>[count]</td>

                          <td>wishdate</td>

                          <td>docreq.purpose</td>

                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-primary request"
                              onClick={openModal2}
                            >수신완료
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* End Table with hoverable rows */}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            {/* End Default Tabs */}
          </div>
        </div>
      </section>
      <DocrequestCORModal show={show1} closeModal={closeModal1}></DocrequestCORModal>
      <DocrequestCOCKModal show={show2} closeModal={closeModal2}></DocrequestCOCKModal>

    </>
  );
}

export default DocrequestCOTab;
