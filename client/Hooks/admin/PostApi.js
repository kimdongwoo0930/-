import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosPost = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, payload) => {
        try {
            const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
            setLoading(true);
            const response = await axios.post(url, payload, {
                headers: {
                    // 토큰 추가
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            });
            if (response.headers.authorization) {
                localStorage.setItem('token', response.headers.authorization);
            }

            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fetchData };
};

export default useAxiosPost;
