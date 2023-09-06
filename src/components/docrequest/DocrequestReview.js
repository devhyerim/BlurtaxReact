import React, { useEffect, useState } from 'react';

function DocrequestReview(props) {

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(-2); // 뒤에서 2자리 연도
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 뒤에서 2자리 월
    const day = ('0' + currentDate.getDate()).slice(-2); // 뒤에서 2자리 일


    const [state, setState] = useState({
        doctype: '',
        doctagetdate: '22-01-01',
        count: '1부',
        purpose: '공공기관 제출용',
        wishdate: `${year}-${month}-${day}`,
        way: '온라인발급(PDF)',
    });

    useEffect(() => {
        const { steps } = props;

        const selectedValue1 = steps.doctype ? steps.doctype.value : state.doctype;
        const selectedValue2 = steps.doctagetdate ? steps.doctagetdate.value : state.doctagetdate;
        const selectedValue3 = steps.count ? steps.count.value : state.count;
        const selectedValue4 = steps.purpose ? steps.purpose.value : state.purpose;
        const selectedValue5 = steps.way ? steps.way.value : state.way;

        setState(prevState => ({
            ...prevState,
            doctype: selectedValue1,
            doctagetdate: selectedValue2,
            count: selectedValue3,
            purpose: selectedValue4,
            way: selectedValue5,
        }));

    }, []);


    return (
        <div style={{ width: '100%' }}>
            <h5>민원서류 신청</h5>
                <table>
                    <tbody>
                        <tr>
                            <td>신청서류</td>
                            <td>{state.doctype}</td>
                        </tr>
                        <tr>
                            <td>서류기간</td>
                            <td>{state.doctagetdate}</td>
                        </tr>
                        <tr>
                            <td>발급부수</td>
                            <td>{state.count}</td>
                        </tr>
                        <tr>
                            <td>용도</td>
                            <td>{state.purpose}</td>
                        </tr>
                        <tr>
                            <td>희망일자</td>
                            <td>{state.wishdate}</td>
                        </tr>
                        <tr>
                            <td>발급방법</td>
                            <td>{state.way}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    );
}

export default DocrequestReview;
