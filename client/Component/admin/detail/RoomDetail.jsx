import React, { useEffect, useState } from 'react';
import styles from '@/styles/admin/Reservation/detail/detailroom.module.css';

const RoomDetail = ({ selectedDate, rooms, color }) => {
    /**
     * 날짜가 변경될떄 리스트 뽑아오기
     */
    const [list, setList] = useState([]);
    const [render, setRender] = useState(false);
    useEffect(() => {
        // console.log(rooms);
        if (selectedDate) {
            if (Object.keys(rooms).includes(selectedDate)) {
                const filteredRoomList = rooms[selectedDate].filter((item) => item !== '');
                setList(filteredRoomList);
            } else {
                setList([]);
            }
        }
    }, [selectedDate]);

    const roomList = [
        '101',
        '102',
        '103',
        '104',
        '105',
        '106',
        '107',
        '108',
        '109',
        '110',
        '111',
        '112',
        '113',
        '114',
        '115',
        '116',
        '117',
        '118',
        '119',
        '120',
        '121',
        '122',
        '123',
        '124',
        '125',
        '126',
        '127',
        '201',
        '202',
        '203',
        '204',
        '205',
        '206',
        '207',
        '208',
        '209',
        '210',
        '211',
        '212',
        '213',
        '214',
        '215',
        '216',
        '217',
        '218',
        '219',
        '220',
        '221',
        '222',
        '223',
        '224',
        '225',
        '226',
        '227',
    ];

    const roomType = {
        1: ['209', '226', '109', '126'],
        2: ['210', '227', '110', '127', '211', '111'],
    };

    useEffect(() => {
        setRender(!render);
    }, [list]);

    useEffect(() => {
        setRender(!render);
    }, [rooms]);

    // useEffect(() => {
    //     console.log(list);
    // });
    /**
     * 종료시
     */

    // useEffect(() => {
    //     return () => {
    //         console.log('RoomDetail 종료');
    //     };
    // }, []);

    return (
        <div className={styles.container}>
            {roomList.map((room, index) => {
                return (
                    <div key={index} className={styles[`RoomBox_${room}`]}>
                        <div
                            className={styles.titleBox}
                            style={
                                roomType[1].includes(room)
                                    ? { backgroundColor: '#D8F0D2' }
                                    : roomType[2].includes(room)
                                    ? { backgroundColor: '#C4F3FF' }
                                    : { backgroundColor: 'lightyellow' }
                            }
                        >
                            {room}
                        </div>
                        <div
                            style={
                                list.includes(room)
                                    ? { backgroundColor: color, flex: 1, width: '100%' }
                                    : { backgroundColor: 'white', flex: 1, width: '100%' }
                            }
                        ></div>
                    </div>
                );
            })}
            <div className={styles.firstFloor}>1F</div>
            <div className={styles.secondFloor}>2F</div>
        </div>
    );
};

export default RoomDetail;
