import TAHeader from '../../components/common/TAHeader';
import Sidebar from '../../components/common/Sidebar';
import DocrequestTATab from '../../components/docrequest/DocrequestTATab';
import '../../resources/assets/css/DocrequestTA.css'

const DocrequestTA = () => {

    return (
        <>
            <div>
                <TAHeader></TAHeader>
                <Sidebar></Sidebar>
            </div>
            <div id="main" class="main">
                <div class="pagetitle">
                    <h1>민원서류 신청</h1>
                </div>
                {/* End Page Title  */}
                <DocrequestTATab ></DocrequestTATab>
            </div>
        </>
    );
}



export default DocrequestTA