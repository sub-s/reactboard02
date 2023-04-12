import React, {useEffect, useState} from 'react';
import {BoardApi as api} from "../Api/BoardApi";
import axios from "axios";


// 환경변수
const API_URL = process.env.REACT_APP_API_URI;

const ListHook = (searchValue) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        setIsLoading(true);
        api.ListApi(searchValue, setIsLoading, setError, setData) // api로 데이터 값을 넘긴다.
    }, [searchValue]);
    return {isLoading, error, data};
}


const ViewHook = (brdNo) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState('');

    useEffect(() => {
        setIsLoading(true);
        api.ViewApi(brdNo, setIsLoading, setError, setData);
    }, []);
    return { isLoading, error, data}
}

const WriteHook = (dataValue, navigate) => {
    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // error state
    const [error, setError] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        if(dataValue.saveEvent === 'Y'){
            api.WriteApi(dataValue, setIsLoading, setError, navigate)
        }

    }, [dataValue, navigate])


    return { isLoading }
}


export const BoardHook = {
    ListHook,
    ViewHook,
    WriteHook,
}


