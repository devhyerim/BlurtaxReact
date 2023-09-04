import TAHeader from '../../components/common/TAHeader';
import HomeTABody from '../../components/home/HomeTABody';
import '../../resources/assets/css/HomeTA.css';

const HomeTA = () => {
    return (
        <>
            <div>
                <TAHeader></TAHeader>
            </div>
            <div id="main" style={{marginLeft: "0px"}}>
                <HomeTABody></HomeTABody>
            </div>
        </>
    );
}



export default HomeTA