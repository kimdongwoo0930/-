import React, { useEffect, useState } from 'react';
import styles from '@/styles/admin/Home/Home.module.css';
import { getReservationByYear_Month_Day } from '@/Api/Home/PostApi.js';
import { VisitorLoading } from '@/Component/Loading/Loading';

const Visitor = () => {
    const [loading, setLoading] = useState(true);

    const [classroom, setClassroom] = useState([]);
    const [room, setRoom] = useState([]);

    useEffect(() => {
        const getData = async () => {
            // 여기에 데이터를 가져오는 함수를 넣어주면 된다.
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;
            const day = new Date().getDate();

            const response = await getReservationByYear_Month_Day(year, month, day);
            if (response.status === 'OK') {
                setClassroom([...response.data.classRoom]);
                setRoom([...response.data.room]);
            }
            setLoading(false);
        };
        getData();
    }, []);

    return (
        <div className={styles.visitor}>
            {loading && <VisitorLoading />}
            {!loading && (
                <>
                    <div className={styles.visitorTitle}>오늘 방문 업체</div>
                    <div className={styles.visitorContainer}>
                        <div className={styles.classRoomContainer}>
                            <div className={styles.classRoomTile}>강의실</div>
                            <div className={styles.classRoomContent}>
                                {classroom?.map((item, index) => {
                                    return <span key={index}>{item} </span>;
                                })}
                                {classroom.length === 0 && '없음'}
                            </div>
                        </div>
                        <div className={styles.RoomContainer}>
                            <div className={styles.RoomTile}>숙박</div>
                            <div className={styles.RoomContent}>
                                {room?.map((item, index) => {
                                    return <span key={index}>{item} </span>;
                                })}
                                {room.length === 0 && '없음'}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Visitor;
