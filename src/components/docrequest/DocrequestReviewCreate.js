import React, { useEffect, useState } from 'react';
import { addDocrequest } from '../../redux/docrequestSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function DocrequestReviewCreate(props) {
    const dispatch = useDispatch();

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


    }, []); // state가 변경될 때만 useEffect 실행

    const handleSubmit = () => {
        // formData 객체를 JSON 문자열로 변환하여 서버로 보냅니다.
        const formDataJSON = JSON.stringify(state);

        // 여기서 axios 또는 fetch 등을 사용하여 서버로 데이터를 보냅니다.
        axios.post("http://localhost:8081/docrequest/docrequestcreate", formDataJSON, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            dispatch(addDocrequest(res.data[0]));
        })
    }

    return (
        <div>
            <h7>민원서류 신청중입니다.</h7>
        </div>
    );
}

export default DocrequestReviewCreate;
