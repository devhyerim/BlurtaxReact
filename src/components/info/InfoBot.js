import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import InvalidBiz from "./InvalidBiz";

const InfoBot = () => {
    const [validBiz, setValidBiz] = useState([]);
    const [invalidBiz, setInvalidBiz] = useState([]);
    const [validBizCount, setValidBizCount] = useState('');
    const [invalidBizCount, setInvalidBizCount] = useState('');
    const history = useHistory();


    const currentDateTime = new Date();
    function formatDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
        const day = date.getDate();

        // 특정 포맷으로 날짜 문자열 생성
        return `${year}년 ${month}월 ${day}일`;
    }
    const fmt = currentDateTime;
    const formattedDate = formatDate(currentDateTime);
    const year2 = formattedDate.substring(0, 4);


    const invalidList = () => {
        
        axios.get(`http://localhost:8081/info/infoTA/year?year=${year2}`).then((res) => {
            const receivedData2 = res.data;

            receivedData2.map((data) => {
                console.log(data.tax);
                if (((data.tax / data.bizincome)) * 100 <= 1) {
                    setInvalidBizCount((prev) => {
                        const invalidCount = Number(prev) + 1;
                        return invalidCount;
                    })
                    setInvalidBiz([...invalidBiz, data]);
                } else if(((data.status === '신고서제출') && (data.tax / data.bizincome)) * 100 > 1){
                    setValidBizCount((prev) => {
                        const vaildCount = Number(prev) + 1;
                        return vaildCount;
                    });
                    setValidBiz([...validBiz, data]);
                }

            })
        })

    }

    const confirmBtn = (e, validBiz) => {
        validBiz.map((CO) => {
            axios
            .patch(`http://localhost:8081/info/infoTA/report`, {
              bizno: CO.bizno,
              bizname: CO.bizname,
              year: CO.year,
              bizincome: CO.bizincome,
              tax: CO.tax,
              reportdate: fmt,
              reportdoc: "신고서",
              paymentslip: "납부서",
              transdate: fmt,
              status: "전송완료"
            })
        })
        
    } 

    const toInfoPage = (e) => {
        history.push('/info/infoTA');
        };

    const toInvalidBizList = (e, invalidBiz) => {
        return (
            <InvalidBiz invalidBiz={invalidBiz}/>
        )
    }
    
    useEffect(() => {
        invalidList();
        
        console.log("invalidBizCount : " + invalidBizCount);
        console.log("invalidBiz: " + invalidBiz);
        console.log("validBizCount : " + validBizCount);
        console.log("validBiz: " + validBiz);
    },[])


    return (
        <div>
            <div>
                오늘은 {formattedDate}입니다.<br />
                소득세 신고기한은 5월 25일입니다.<br />
                현재 입력된 금액을 기준으로 자동 신고 대상 수임처는 총 <span className="fs-5">{validBizCount}</span>건 입니다.<br />
                재검토가 요구되는 수임처는 총 <span className="fs-5">{invalidBizCount}</span>건 입니다.
                <span className="fs-5">확인</span>버튼을 누르시면 자동 신고 대상 수임처에 한해 신고가 자동으로 완료되고 납부서가 전송됩니다.<br/>
                신고기한 내에는 언제든지 신고내역을 수정하여 제출할 수 있습니다.<br/>
                <span className="fs-5">이동</span>버튼을 누르시면 신고납부 페이지로 이동합니다.<br/>
                <div className="btn btn-primary mt-2" onClick={(e) => confirmBtn(e, validBiz)}>
                    확인
                </div>
                <div className="btn btn-secondary mt-2" onClick={(e) => toInfoPage(e)}>이동</div>
            </div>
        </div>
    );
}
export default InfoBot;