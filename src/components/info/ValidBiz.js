import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";


const ValidBiz = () => {

    const [validBiz, setValidBiz] = useState([]);
    const [invalidBiz, setInvalidBiz] = useState([]);
    const [validBizCount, setValidBizCount] = useState('');
    const [invalidBizCount, setInvalidBizCount] = useState('');


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

    useEffect(() => {
        invalidList();
        
        console.log("invalidBizCount : " + invalidBizCount);
        console.log("invalidBiz: " + invalidBiz);
        console.log("validBizCount : " + validBizCount);
        console.log("validBiz: " + validBiz);
    },[])


    return (

        validBiz.map((biz) => {
                <div>
                    {biz.bizname}
                </div>
            })

    );
}

export default ValidBiz;