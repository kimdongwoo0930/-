import axios from 'axios';

const getReservationByYear_Month_Day = async (year, month, day) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_CLASSROOM_BY_YEAR_AND_MONTH_AND_DAY,
            {
                year: year,
                month: month,
                day: day,
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
export { getReservationByYear_Month_Day };
