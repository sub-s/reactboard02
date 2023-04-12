import React from 'react';
import axios from "axios";



// 환경 변수 셋팅
const API_URL = process.env.REACT_APP_API_URI;

// 리스트 api
function ListApi(searchValue, setIsLoading, setError, setData) {// Hook 에서  데이터 값을 받는다.
    axios
        .get(`${API_URL}board/boardApiList`, {
            params : searchValue,
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
            // setError(true);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
        .finally(() => {
            setIsLoading(false);
        });
}


// 상세 페이지 Api
const ViewApi = (brdNo, setIsLoading, setError, setData) => {
    axios
        .get(`${API_URL}board/boardApiView?brdNo=${brdNo}`) //?brdNo=${brdNo} 로 인자값 전달
        .then((res) => {
            let data = res.data.list;
            setData(data);

            console.log(res);
        })
        .catch((error) => {
            // setError(true);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
        .finally(()=>{
            setIsLoading(false)
        });
}


// 글쓰기 Api
const WriteApi = (dataValue, setIsLoading, setError, navigate) => {
    axios
        .post(API_URL + "board/modifyBoardApi", dataValue)
        .then((res) => {
            let data = res.data;
            if (data.code === "0000") {
                alert(data.msg)
                navigate("/BoardList"); // 게시글 작성 후 리스트로 이동.
            } else {
                setError(true);
                alert(data.msg)
            }
        })
        .catch((error) => {
            // setError(true);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
        .finally(() => {
            setIsLoading(false);
            dataValue["saveEvent"] = 'N'
        });
}



export const BoardApi = {
    ListApi,
    ViewApi,
    WriteApi
}


