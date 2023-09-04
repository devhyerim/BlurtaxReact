import COHeader from '../../components/common/COHeader';
import HomeCOBody from '../../components/home/HomeCOBody';
import '../../resources/assets/css/HomeCO.css';

const HomeCO = () => {
    return (
        <>
            <div>
                <COHeader></COHeader>
            </div>
            <div id="main" style={{marginLeft: "0px"}}>
                <HomeCOBody></HomeCOBody>
            </div>
        </>
    );
}



export default HomeCO