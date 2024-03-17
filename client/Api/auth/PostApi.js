import axios from 'axios';

const signUp = async (name, id, password) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_REGISTER,
            {
                username: name,
                userId: id,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

const login = async (id, password) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_LOGIN,
            {
                userId: id,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.headers.authorization) {
            localStorage.setItem('token', response.headers.authorization);
        }

        return response.data;
    } catch (error) {
        return error;
    }
};

/**
 * 계정 변경 함수들
 */

const changeStatus = async (id, status) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_CHANGE_STATUS,
            {
                userId: id,
                status: status,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

const changeRole = async (id, role) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_CHANGE_ROLE,
            {
                userId: id,
                role: role,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export { signUp, login, changeStatus, changeRole };
