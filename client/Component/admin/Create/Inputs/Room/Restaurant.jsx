import React, { useEffect, useState } from 'react';

import styles from '@/styles/admin/Reservation/Reservation.module.css';

const Restaurant = ({ date, restaurantDatas, setRestaurantDatas, reservationId }) => {
    const [breakfast, setBreakfast] = useState(0);
    const [lunch, setLunch] = useState(0);
    const [dinner, setDinner] = useState(0);
    const [special, setSpecial] = useState('없음');
    // 번호가 들어오면 해당 날짜에 저장하기

    useEffect(() => {
        if (!date) return;

        console.log(restaurantDatas, date);
        if (restaurantDatas && Object.keys(restaurantDatas).includes(date)) {
            const { breakfast, lunch, dinner, special } = restaurantDatas[date];
            setBreakfast(breakfast);
            setLunch(lunch);
            setDinner(dinner);
            setSpecial(special);
            return;
        }
        setRestaurantDatas((prevData) => ({
            ...prevData,
            [date]: {
                breakfast: 0,
                lunch: 0,
                dinner: 0,
                special: '없음',
            },
        }));
    }, [reservationId]);

    useEffect(() => {
        if (!date) return;
        setRestaurantDatas((prevData) => ({
            ...prevData,
            [date]: {
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner,
                special: special,
            },
        }));
    }, [breakfast, lunch, dinner, special]);

    const OnchangeHandleer = (e, time) => {
        if (time === 'breakfast') {
            setBreakfast(e.target.value);
        } else if (time === 'lunch') {
            setLunch(e.target.value);
        } else if (time === 'dinner') {
            setDinner(e.target.value);
        } else if (time === 'special') {
            setSpecial(e.target.value);
        }
    };

    return (
        <div className={styles.RestaurantContiner}>
            <div>{date}</div>
            <label>조</label>
            <input
                type="number"
                value={breakfast}
                onChange={(e) => OnchangeHandleer(e, 'breakfast')}
                min={0}
                max={999}
            />
            <span>명</span>
            <label>중</label>
            <input type="number" value={lunch} onChange={(e) => OnchangeHandleer(e, 'lunch')} m min={0} max={999} />
            <span>명</span>

            <label>석</label>
            <input type="number" value={dinner} onChange={(e) => OnchangeHandleer(e, 'dinner')} min={0} max={999} />
            <span>명</span>

            <label>특</label>
            <select onChange={(e) => OnchangeHandleer(e, 'special')} value={special} style={{ width: 85 }}>
                <option value="없음">없음</option>
                <option value="조식">조식</option>
                <option value="중식">중식</option>
                <option value="석식">석식</option>
                <option value="조식+중식">조식+중식</option>
                <option value="중식+석식">중식+석식</option>
                <option value="조식+석식">조식+석식</option>
            </select>
        </div>
    );
};

export default Restaurant;
