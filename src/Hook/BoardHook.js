import React, {useEffect, useState} from 'react';
import {BoardApi as api} from "../Api/BoardApi";


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

export const BoardHook = {
    ListHook,
}


