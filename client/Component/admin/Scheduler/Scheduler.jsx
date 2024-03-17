import styles from '@/styles/admin/Reservation/Scheduler.module.css';
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';

import { useReservationData } from '@/Hooks/ReservationData';
import { getReservation } from '@/Api/admin/PostApi';

import { BiMessageAltCheck } from 'react-icons/bi';

import data from '@/Data/admin/data';
import { loadRecordDetail } from '@/Api/admin/GetApi';

import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
import { ScheduleLoading } from '@/Component/Loading/Loading';

const Scheduler = ({ openDetail, setCurrentdate, openTab, setLoadData, setDetailLoading }) => {
    // 첫부분 로딩화면 데이터 전송전에
    const [loading, setLoading] = useState(true);

    // ====================================================================================================

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currrantDate, setCurrrantDate] = useState(new Date().getDate());

    const [lastDay, setLastDay] = useState(new Date(currentYear, currentMonth, 0).getDate());
    const [firstWeek, setFirstWeek] = useState(new Date(currentYear, currentMonth - 1, 1).getDay());
    const [WeekList, setWeekList] = useState([]);

    const [reservationData, setReservationData] = useState({});
    const [roomData, setRoomData] = useState({});

    const router = useRouter();

    // const [organizationList, setOrganizationList] = useState({});

    // ====================================================================================================
    // 예약 번호로 업체를 찾아보자

    // const findOrganization = (reservation, room) => {
    //     const organizationList = {};
    //     Object.keys(room).map((Id) => {
    //         const organization = reservation.filter((item) => item.reservationId === Id);
    //         organization[Id] = organization.organization;
    //     });
    //     return organizationList;
    // };

    // ====================================================================================================

    /**
     *  날짜가 바뀌면 새로운 데이터를 받아와야한다.
     */

    const getReservationData = async () => {
        const { reservation, room } = await getReservation(currentYear, currentMonth);
        console.log(reservation, room);
        if (reservation?.status === 'OK' && room?.status === 'OK') {
            setReservationData(useReservationData(reservation.data, currentYear, currentMonth));
            // setOrganizationList(findOrganization(reservation.data, room.data));
            setRoomData(room.data);
        } else if (reservation?.response?.status === 500) {
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            router.push('/admin/auth/login');
        } else {
            setReservationData({
                101: [],
                102: [],
                103: [],
                105: [],
                106: [],
                107: [],
                201: [],
                202: [],
                203: [],
                204: [],
                205: [],
                206: [],
                A: [],
                B: [],
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            getReservationData();
        }, 500); // 애니메이션 지속 시간에 따라 타임아웃 설정 (여기서는 300ms)
        return () => clearTimeout(timeout); // cleanup 함수를 이용하여 타임아웃 클리어
    }, [currentYear, currentMonth]);

    // ====================================================================================================
    useEffect(() => {
        setWeekList(createMonthList(firstWeek, lastDay));

        // setReservationData(useReservationData(data.dump_reservation));
    }, []);

    useEffect(() => {
        setLastDay(new Date(currentYear, currentMonth, 0).getDate());
        setFirstWeek(new Date(currentYear, currentMonth - 1, 1).getDay());
    }, [currentYear, currentMonth]);

    useEffect(() => {
        setWeekList(createMonthList(firstWeek, lastDay));
    }, [lastDay, firstWeek]);

    const NextMonth = () => {
        setLoading(true);
        if (currentMonth < 12) {
            setCurrentMonth(currentMonth + 1);
        } else {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        }
    };
    const PrevMonth = () => {
        setLoading(true);
        if (currentMonth > 1) {
            setCurrentMonth(currentMonth - 1);
        } else {
            setCurrentMonth(12);
            setCurrentYear(currentYear - 1);
        }
    };

    const createMonthList = (startingDayIndex, daysInMonth) => {
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
        const monthList = [];

        // 시작하는 요일부터 말일까지의 날짜를 리스트에 추가합니다.
        for (let i = startingDayIndex; i < startingDayIndex + daysInMonth; i++) {
            const dayOfWeek = i % 7; // 요일 인덱스를 0부터 6으로 순환하도록 설정합니다.
            monthList.push({ date: i - startingDayIndex + 1, dayOfWeek: weekDays[dayOfWeek] });
        }

        return monthList;
    };

    /**
     * 불러오기 부분
     */

    const onClickReservation = async (e) => {
        setDetailLoading(true);
        openTab(false);
        const response = await loadRecordDetail(e);
        console.log(response.data);
        if (response.status === 'OK') {
            setLoadData({ ...response.data, reservationId: e });
            openDetail(true);
            await sleep(500);
        } else {
            alert('불러오기 실패');
        }
        setDetailLoading(false);
    };

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    // ====================================================================================================
    // 애니메이션 부분

    // const animationTiming = {
    //     enter: 500,
    //     exit: 500,
    // };
    // const [animate, setAnimate] = useState(true);

    const [start, setStart] = useState(false);
    useEffect(() => {
        setStart(true);
    }, []);

    // useEffect(() => {
    //     console.log(reservationData);
    // });

    // ====================================================================================================
    return (
        <>
            {/* 로딩화면 */}
            <section className={`${styles.Main} ${start ? styles.active : ''}`}>
                {/* 연도와 달 변경 부분 */}
                <header className={styles.Header}>
                    <FiArrowLeftCircle className={styles.ChangeMonthBtn} onClick={PrevMonth} />
                    <div className={styles.CurrentMonth}>
                        {currentYear} / {currentMonth}
                    </div>
                    <FiArrowRightCircle className={styles.ChangeMonthBtn} onClick={NextMonth} />
                </header>
                {/* 달력 부분 */}
                {/* 테이블로 생성을 한번 해보자 */}
                {loading && <ScheduleLoading />}
                {!loading && (
                    <div className={styles.TableContainer}>
                        {/* <CSSTransition
                            in={animate}
                            timeout={animationTiming}
                            unmountOnExit
                            mountOnEnter
                            classNames={{
                                enter: `${styles.rotateLeft}`,
                                exit: `${styles.rotateRight}`,
                            }}
                            onEnter={() => {
                                console.log('enter');
                            }}
                            onExit={() => console.log('exit')}
                        > */}
                        <table
                            // className={`${styles.Calendar}
                            // ${isLeftAnimating ? styles.animate_left : ''} ${
                            //     isRightAnimating ? styles.animate_right : ''
                            // }`}
                            className={styles.Calendar}
                        >
                            <thead>
                                {/* 날짜 부분 */}
                                <tr>
                                    <th rowSpan={2} colSpan={3}></th>
                                    {WeekList.map((week, index) => {
                                        return (
                                            <th
                                                key={index}
                                                className={styles.Day}
                                                style={
                                                    week.dayOfWeek === '토'
                                                        ? { color: 'rgb(0,135,212)' }
                                                        : week.dayOfWeek === '일'
                                                        ? { color: 'rgb(236,0,140)' }
                                                        : {}
                                                }
                                            >
                                                {index + 1}
                                            </th>
                                        );
                                    })}
                                </tr>
                                {/* 요일 부분 */}
                                <tr>
                                    {WeekList.map((week, index) => {
                                        return (
                                            <th
                                                key={index}
                                                className={styles.Week}
                                                style={
                                                    week.dayOfWeek === '토'
                                                        ? { color: 'rgb(0,135,212)' }
                                                        : week.dayOfWeek === '일'
                                                        ? { color: 'rgb(236,0,140)' }
                                                        : {}
                                                }
                                            >
                                                {week.dayOfWeek}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {data.rooms.map((room, beforeindex) => (
                                    <>
                                        {room.num.map((num, index) => {
                                            return (
                                                <tr key={index}>
                                                    {index === 0 && (
                                                        <td
                                                            rowSpan={room.num.length}
                                                            colSpan={2}
                                                            align="center"
                                                            className={styles.classroomName}
                                                        >
                                                            {room.name}
                                                        </td>
                                                    )}
                                                    <td align="center" className={styles.classname}>
                                                        {num}
                                                    </td>

                                                    {WeekList.map((week, index) => {
                                                        if (reservationData[num] && reservationData[num].length > 0) {
                                                            const reservationNumData = reservationData[num];
                                                            const bookedDate = [];
                                                            const length = {};
                                                            reservationNumData.map((item) => {
                                                                bookedDate.push(...item.date);
                                                                const min = Math.min(...item.date);
                                                                length[min] = item;
                                                            });

                                                            if (Object.keys(length).includes(String(index + 1))) {
                                                                const item = length[index + 1];
                                                                return (
                                                                    <td
                                                                        key={item.reservationId}
                                                                        className={styles.Reservation}
                                                                        style={{
                                                                            backgroundColor: item.color,
                                                                            color: 'white',
                                                                        }}
                                                                        colSpan={item.date.length}
                                                                        onClick={() => {
                                                                            onClickReservation(item.reservationId);
                                                                        }}
                                                                    >
                                                                        {item.organization}
                                                                    </td>
                                                                );
                                                            } else if (bookedDate.includes(index + 1)) {
                                                            } else {
                                                                return <td key={index} className={styles.blank}></td>;
                                                            }
                                                        } else {
                                                            return <td key={index} className={styles.blank}></td>;
                                                        }
                                                    })}
                                                </tr>
                                            );
                                        })}
                                    </>
                                ))}
                                {Object.keys(roomData).map((Id, index) => {
                                    const DateList = roomData[Id].dates
                                        .map((date) => parseInt(date, 10))
                                        .sort((a, b) => a - b);
                                    // 업체명을 찾아야한다.
                                    // const oragnization =
                                    return (
                                        <tr>
                                            {index === 0 && (
                                                <td
                                                    style={{ borderRight: '1px solid gray' }}
                                                    rowSpan={Object.keys(roomData).length}
                                                    colSpan={3}
                                                    className={styles.classroomName}
                                                    align="center"
                                                >
                                                    숙소
                                                </td>
                                            )}
                                            {WeekList.map((week, index) => {
                                                if (index + 1 === DateList[0]) {
                                                    return (
                                                        <td
                                                            key={index}
                                                            className={styles.Reservation}
                                                            style={{
                                                                backgroundColor: roomData[Id].color_code,
                                                                color: 'white',
                                                            }}
                                                            colSpan={DateList.length}
                                                            onClick={() => {
                                                                onClickReservation(Id);
                                                            }}
                                                        >
                                                            {roomData[Id].organization}
                                                        </td>
                                                    );
                                                } else if (DateList.includes(index + 1)) {
                                                    return <></>;
                                                } else {
                                                    return <td key={index} className={styles.blank}></td>;
                                                }
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* </CSSTransition> */}
                    </div>
                )}
            </section>
            )
        </>
    );
};

export default Scheduler;
