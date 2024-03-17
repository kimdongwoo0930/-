import React, { useEffect } from 'react';
import useAxiosPost from '@/Hooks/admin/PostApi';

const loadReservation = (url, request) => {
    const { data, error, loading, fetchData } = useAxiosPost();

    useEffect(() => {
        fetchData(url, {
            request: request,
        });
    }, []);

    useEffect(() => {
        if (!loading) {
            if (data) {
                return data;
            }
        }
    }, [data, error, loading]);
};

export default loadReservation;
