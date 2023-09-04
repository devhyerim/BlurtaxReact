import React, { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DocrequestTAModal from './DocrequestTAModal';

const DocrequestTATab = () => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);


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

                          <td>
                            <button
                              type="button"
                              class="btn btn-outline-primary request"
                              onClick={openModal}
                            >발급하기
                            </button>
                          </td>
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

                          <td>drstatename</td>
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
      <DocrequestTAModal show={show} closeModal={closeModal}></DocrequestTAModal>
    </>
  );
}

export default DocrequestTATab;
