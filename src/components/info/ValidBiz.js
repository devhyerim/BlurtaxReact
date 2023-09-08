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
                if (((data.tax / data.bizincome) * 100) <= 1) {
                    setInvalidBizCount((prev) => {
                        const invalidCount = Number(prev) + 1;
                        setInvalidBiz((prev) => [...prev, data]);
                        return invalidCount;
                    })
                } else if (((data.tax / data.bizincome) * 100 > 1) && (data.status === '신고서제출')) {
                    setValidBizCount((prev) => {
                        const vaildCount = Number(prev) + 1;
                        setValidBiz((prev) => [...prev, data]);
                        return vaildCount;
                    });
                }

            })
        })

    }

    useEffect(() => {
        invalidList();
    }, [])

    console.log(validBiz);


    return (
        <div>
            <table className="table table-hover table-bordered table-sm">
                <thead>
                    <tr>
                        <th scope="col" className="tabletop">
                            수임처
                        </th>
                        <th scope="col" className="tabletop">
                            소득금액
                        </th>
                        <th scope="col" className="tabletop">
                            결정세액
                        </th>
                    </tr>
                </thead>
                <tbody id="maketd">
                    {validBiz.map((biz) => {
                        const formattedBizIncome = parseInt(biz.bizincome).toLocaleString(); // 숫자에 쉼표 추가
                        const formattedTax = parseInt(biz.tax).toLocaleString(); // 숫자에 쉼표 추가
                        return (
                            <tr key={biz.bizno}>
                              <td>
                                {biz.bizname}
                              </td>
                              <td>
                                {formattedBizIncome}
                              </td>
                              <td>
                                {formattedTax}
                              </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ValidBiz;