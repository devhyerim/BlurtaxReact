import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DocrequestCORModal from './DocrequestCORModal';
import DocrequestCOCKModal from './DocrequestCOCKModal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addDocrequest } from '../../redux/docrequestSlice';

const DocrequestCOTab = () => {
  const docrequestList = useSelector(state => state.docrequest.docrequestList);

  const dispatch = useDispatch();

  const [show1, setShow1] = useState(false);

  const openModal1 = (doc) => {
    setShow1(true);
    setSelectDoc(doc);
  }

  const closeModal1 = () => setShow1(false);

  const [show2, setShow2] = useState(false);

  const openModal2 = () => setShow2(true);
  const closeModal2 = () => setShow2(false);

  const [selectDoc, setSelectDoc] = useState({});


  const docListHandler = () => {
    axios.get("http://localhost:8081/docrequest/docrequestlist").then((res) => {
      res.data.forEach((item) => {
        dispatch(addDocrequest(item))
      })
    })
  };

  useEffect(() => {
    docListHandler();
  }, []);


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
                          <th scope="col" class="tabletop">발급신청자</th>
                          <th scope="col" class="tabletop">신청서류</th>
                          <th scope="col" class="tabletop">발급희망일</th>
                          <th scope="col" class="tabletop">용도 및 제출처</th>
                          <th scope="col" class="tabletop">발급상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docrequestList && docrequestList.map((doc) =>
                          doc.drstate.drstatename === "발급신청" && (
                            <tr>
                              <td scope="row">{doc.member.membername}</td>
                              <td>
                                <b>{doc.doctype}</b>[{doc.count}]
                              </td>
                              <td>{doc.wishdate}</td>
                              <td>{doc.purpose}</td>
                              <td>{doc.drstate.drstatename}</td>
                            </tr>
                          )
                        )}
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
                          <th scope="col" class="tabletop">발급신청자</th>
                          <th scope="col" class="tabletop">신청서류</th>
                          <th scope="col" class="tabletop">발급희망일</th>
                          <th scope="col" class="tabletop">용도 및 제출처</th>
                          <th scope="col" class="tabletop">발급상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docrequestList && docrequestList.map((doc) =>
                          (doc.drstate.drstatename === "발급완료" || doc.drstate.drstatename === "수신완료") && (
                            <tr>
                              <td scope="row">{doc.member.membername}</td>
                              <td>
                                <b>{doc.doctype}</b>[{doc.count}]
                              </td>
                              <td>{doc.wishdate}</td>
                              <td>{doc.purpose}</td>
                              {doc.drstate.drstatename === "발급완료" ? (
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary request"
                                    onClick={() => openModal1(doc)}
                                  >
                                    수신하기
                                  </button>
                                </td>
                              ) : (
                                doc.drstate.drstatename === "수신완료" && (
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary request"
                                      onClick={openModal2}
                                    >
                                      수신완료
                                    </button>
                                  </td>
                                )
                              )}
                            </tr>
                          )
                        )}
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
      <DocrequestCORModal show={show1} closeModal={closeModal1} selectDoc={selectDoc}></DocrequestCORModal>
      <DocrequestCOCKModal show={show2} closeModal={closeModal2}></DocrequestCOCKModal>

    </>
  );
}

export default DocrequestCOTab;
