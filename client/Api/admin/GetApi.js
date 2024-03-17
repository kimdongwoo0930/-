import axios from 'axios';

const searchRecord = async (organization) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.get(
            process.env.NEXT_PUBLIC_SEARCH_RESERVATION_BY_ORGANIZATION + `/${organization}`,
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

const loadRecordDetail = async (reservationId) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.get(process.env.NEXT_PUBLIC_SEARCH_RESERVATION_BY_ID + `/${reservationId}`, {
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

export { searchRecord, loadRecordDetail };
