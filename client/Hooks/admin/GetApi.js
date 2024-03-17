import { useState } from 'react';
import Axios from 'axios';

const useAxiosGet = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (url) => {
        try {
            const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
            const response = await Axios.get(url, {
                headers: {
                    // 토큰 추가
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            });
            console.log(response);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useAxiosGet;
