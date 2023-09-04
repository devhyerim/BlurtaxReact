import { useState } from 'react';
import COHeader from '../../components/common/COHeader';
import DocrequestCOSidebar from '../../components/docrequest/DocrequestCOSidebar';
import DocrequestCOTab from '../../components/docrequest/DocrequestCOTab';
import DocrequestCODAModal from '../../components/docrequest/DocrequestCODAModal';
import '../../resources/assets/css/DocrequestCO.css'

const DocrequestCO = () => {
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return(
        <>
        <DocrequestCODAModal show={show} closeModal={closeModal}></DocrequestCODAModal>
        <div>
            <COHeader></COHeader>
            <DocrequestCOSidebar openModal={openModal}></DocrequestCOSidebar>
        </div>
        <div id="main" class="main">
            <div class="pagetitle">
                <h1>민원서류 신청</h1>
            </div>
                <DocrequestCOTab></DocrequestCOTab>
        </div>
        </>
    );
}



export default DocrequestCO