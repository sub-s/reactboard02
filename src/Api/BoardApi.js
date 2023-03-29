import React from 'react';
import axios from "axios";

// 환경 변수 셋팅
const API_URL = process.env.REACT_APP_API_URI;

// 리스트 api
function ListApi(searchValues, setIsLoading, setError, setData) {// Hook 에서  데이터 값을 받는다.
    axios
        .get(`${API_URL}board/boardApiList`, {
            params : searchValues,
        })
        .then((res) => {
            let data = res.data;
            if (data.code === "0000") {
                console.log(data.msg);
                setData(data.list)
            } else {
                alert("잘못된 접근입니다.");
            }
        })
        .catch((error) => {
            setError(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
}

export const BoardApi = {
    ListApi,
}


