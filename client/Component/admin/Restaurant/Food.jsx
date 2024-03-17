import styles from '@/styles/admin/Reservation/Restaurant/Food.module.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useEffect } from 'react';
import SideBar from '@/Component/Menu/SideBar';
import koLocale from '@fullcalendar/core/locales/ko';
import { gettingRestaurantTotal } from '@/Api/admin/PostApi';
import { FoodLoading } from '@/Component/Loading/Loading';

const Food = () => {
    const [events, setEvents] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // // useEffect(() => {
    // //     const getData = async () => {
    // //         setLoading(true);
    // //         // 요번날 시작과 끝날 구하기
    // const startDate = new Date();
    // const endDate = new Date();
    // startDate.setDate(1);
    // endDate.setMonth(endDate.getMonth() + 1);
    // endDate.setDate(0);
    // const startDateString = startDate.toISOString().split('T')[0]; // "2024-03-16"
    // const endDateString = endDate.toISOString().split('T')[0]; // "2024-03-31"
    // console.log('첫 번째 날:', startDateString);
    // console.log('마지막 날:', endDateString);
    // //         // const response = await gettingRestaurantTotal(startDateString, endDateString);
    // //         // console.log('식수 표:', response);
    // //         // if (response.status === 'OK') {
    // //         //     response.data.map((item) => {
    // //         //         // console.log(item);
    // //         //         setEvents((prev) => {
    // //         //             return [
    // //         //                 ...prev,
    // //         //                 {
    // //         //                     title: item.title,
    // //         //                     start: new Date(item.start),
    // //         //                     className: styles.event,
    // //         //                     extendedProps: {
    // //         //                         breakfast: item.food.breakfast,
    // //         //                         lunch: item.food.lunch,
    // //         //                         dinner: item.food.dinner,
    // //         //                     },
    // //         //                 },
    // //         //             ];
    // //         //         });
    // //         //     });
    // //         // }
    // //     };
    // //     setLoading(false);
    // //     getData();
    // // }, []);

    // 헤더 설정
    const customHeader = {
        left: '',
        center: 'title',
        right: 'today prev,next',
    };
    const handleDatesRender = async (info) => {
        setLoading(true);
        const view = info.view;
        const startDate = view.currentStart;
        const endDate = view.currentEnd;
        const startDateString = startDate.toISOString().split('T')[0]; // "2024-03-16"
        const endDateString = endDate.toISOString().split('T')[0]; // "2024-03-31"
        // console.log('첫 번째 날:', startDateString);
        // console.log('마지막 날:', endDateString);

        const response = await gettingRestaurantTotal(startDateString, endDateString);
        console.log('식수 표:', response);

        if (response.status === 'OK') {
            response.data.map((item) => {
                // console.log(item);
                setEvents((prev) => {
                    return [
                        ...prev,
                        {
                            title: item.title,
                            start: new Date(item.start),
                            className: styles.event,
                            extendedProps: {
                                breakfast: item.food.breakfast,
                                lunch: item.food.lunch,
                                dinner: item.food.dinner,
                            },
                        },
                    ];
                });
            });
        } else if (response?.response?.status === 500) {
        }

        setLoading(false);
    };

    return (
        <div className={styles.food}>
            <SideBar />
            <div
                style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'visible', marginTop: 50 }}
            >
                <div className={styles.title}>식수 표</div>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        padding: '0 20px',
                    }}
                >
                    {loading && <FoodLoading />}
                    <div className={`${styles.foodContainer} ${loading ? styles.invisible : ''}`}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            height={'90%'}
                            selectable={true}
                            headerToolbar={customHeader}
                            locale={koLocale}
                            windowResizeDelay={0}
                            className={styles.calendar}
                            eventContent={Box}
                            events={events}
                            datesSet={(e) => {
                                setEvents([]);
                                handleDatesRender(e);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Box = (e) => {
    return (
        <div className={styles.BoxContainer}>
            <div className={styles.Box}>
                <span>조</span>
                <div>{e.event.extendedProps.breakfast}명</div>
            </div>
            <div className={styles.Box}>
                <span>중</span>
                <div>{e.event.extendedProps.lunch}명</div>
            </div>
            <div className={styles.Box}>
                <span>석</span>
                <div>{e.event.extendedProps.dinner}명</div>
            </div>
        </div>
    );
};

export default Food;
