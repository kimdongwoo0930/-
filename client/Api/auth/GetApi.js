import axios from 'axios';

const getPermission = async () => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.get(process.env.NEXT_PUBLIC_CHECK_PERMISSION, {
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

const getAccountInfo = async () => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.get(process.env.NEXT_PUBLIC_ACCOUNT_INFO, {
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

// 토큰 만료및 확인 여부
const checkToken = async () => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.get(process.env.NEXT_PUBLIC_CHECK_TOKEN, {
            headers: {
                'Content-Type': 'application/json',
                authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export { getPermission, getAccountInfo, checkToken };
