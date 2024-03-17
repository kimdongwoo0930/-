import axios from 'axios';

// 예약 추가
const addReservation = async (data) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_CREATE_RESERVATION,
            {
                organization: data.organization,
                address: data.address,
                purpose: data.purpose,
                color_code: data.color_code,
                people: data.people,
                startdate: data.startdate,
                enddate: data.enddate,
                customer: data.customer,
                customer_phone: data.customer_phone,
                customer_phone2: data.customer_phone2,
                customer_email: data.customer_email,
                classroom: data.classroom,
                rooms: data.rooms,
                restaurant: data.restaurant,
                status: data.status,
                memo: data.memo,
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

const checkReservationRoom = async (start_date, end_date) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_CHECK_RESERVATION_ROOM,
            {
                start_date: start_date,
                end_date: end_date,
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

const getReservationRoom = async (year, month) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_ROOM_BY_YEAR_AND_MONTH,
            {
                year: year,
                month: month,
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
/**
 * 강의실 정보와 객실정보를 동시에 가져와야할것 같다.
 */
const getReservation = async (year, month) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_RESERVATION_BY_YEAR_AND_MONTH,
            {
                year: year,
                month: month,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            }
        );
        const response2 = await axios.post(
            process.env.NEXT_PUBLIC_GET_ROOM_BY_YEAR_AND_MONTH,
            {
                year: year,
                month: month,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token,
                },
            }
        );
        return { reservation: response.data, room: response2.data };
    } catch (error) {
        return { reservation: error, room: error };
    }
};

/**
 * 예약 수정
 */
const updateReservation = async (data) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(process.env.NEXT_PUBLIC_UPDATE_RESERVATION, data, {
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

const gettingRestaurantTotal = async (start, end) => {
    try {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_RESTAURANT_TOTAL,
            {
                start_date: start,
                end_date: end,
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

// 예약 현활 데이터 가져오기
// const getReservation = async() =>

export {
    checkReservationRoom,
    addReservation,
    getReservation,
    updateReservation,
    getReservationRoom,
    gettingRestaurantTotal,
};
