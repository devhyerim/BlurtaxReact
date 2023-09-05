import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import DocrequestTAModal from './DocrequestTAModal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addDocrequest } from '../../redux/docrequestSlice';

const DocrequestTATab = () => {
  const docrequestList = useSelector(state => state.docrequest.docrequestList);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [selectDoc, setSelectDoc] = useState({});

  const openModal = (doc) => {
    setShow(true)
    setSelectDoc(doc);
  };
  const closeModal = () => setShow(false);


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
                          <th scope="col" class="tabletop">발급신청자1</th>
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
                              <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary request"
                                    onClick={() => openModal(doc)}
                                  >
                                    발급하기
                                  </button>
                                </td>
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
                          <th scope="col" class="tabletop">발급신청자2</th>
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
                              <td>{doc.drstate.drstatename}</td>
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
      <DocrequestTAModal show={show} closeModal={closeModal} selectDoc={selectDoc}></DocrequestTAModal>

    </>
  );
}

export default DocrequestTATab;
