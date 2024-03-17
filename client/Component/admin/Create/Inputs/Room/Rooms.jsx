import React, { useEffect } from 'react';
import styles from '@/styles/admin/Reservation/Create/Rooms.module.css';
import { useState } from 'react';
import { checkReservationRoom } from '@/Api/admin/PostApi';
import { useRouter } from 'next/router';

const Rooms = ({ color, roomData, setRoomData, date, start_date, end_date, reservationId }) => {
    const [selectedColor, setSelectedColor] = useState('');

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
        setSelectedColor(color);
    }, [color]);

    /**
     * 종료시
     */

    // ====================================================================================================

    /**
     * 데이터 요청 부분
     */
    // 데이터 요청
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            // if (date !== '기본 값') {
            //     const temp = !roomData.hasOwnProperty(date) ? roomData['기본 값'] : roomData[date];
            //     setRoomData({ ...roomData, [date]: temp });
            // }
            if (date && start_date && end_date) {
                let data = {};
                if (date === '기본 값') {
                    const newEndDate = new Date(end_date);
                    newEndDate.setDate(newEndDate.getDate() - 1);
                    const formattedEndDate = newEndDate.toISOString().slice(0, 10);
                    data = await checkReservationRoom(start_date, formattedEndDate);
                } else {
                    data = await checkReservationRoom(date, null);
                }

                if (data.response?.status === 500) {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                    router.push('/admin/auth/login');
                } else if (data.status === 'OK') {
                    console.log('데이터 정상 전송');
                    console.log(data.data);
                    MakeBookedRoom(data.data);
                } else if (data.status === 'NOT_FOUND') {
                    console.log('데이터 없음');
                    setBookedRoom({});
                    setBookedList([]);
                    setOrganizationColor({});
                }
            }
        };
        fetchData();
    }, [date]);

    useEffect(() => {
        const fetchData = async () => {
            if (!start_date || !end_date) return;
            const newEndDate = new Date(end_date);
            newEndDate.setDate(newEndDate.getDate() - 1);
            const formattedEndDate = newEndDate.toISOString().slice(0, 10);
            const data = await checkReservationRoom(start_date, formattedEndDate);
            console.log(data);
            if (data.response?.status === 500) {
                alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
                router.push('/admin/auth/login');
            } else if (data.status === 'OK') {
                console.log('데이터 정상 전송');
                MakeBookedRoom(data.data);
            } else if (data.status === 'NOT_FOUND') {
                console.log('데이터 없음');
                // 데이터가 없는경우 초기화해야한다
                setBookedRoom({});
                setBookedList([]);
                setOrganizationColor({});
            }
        };
        fetchData();
    }, [start_date, end_date]);

    // ====================================================================================================

    // 이미 예약된 데이터 처리
    const [bookedRoom, setBookedRoom] = useState({});
    const [bookedList, setBookedList] = useState([]);
    const [organizationColor, setOrganizationColor] = useState({});
    // 기본값 부분 예약된 범위 구하기
    const MakeBookedRoom = (data) => {
        const bookedRoom = {};
        const bookedlist = [];
        const organizationColor = {};

        // 기본값인 경우
        data.map((item) => {
            if (reservationId && item.reservationId === reservationId) return;
            item.roomList.map((room) => {
                bookedRoom[room] = item.color;
                bookedlist.push(room);
            });
            const filteredRoomList = item.roomList.filter((item) => item !== '');
            if (filteredRoomList.length > 0) {
                organizationColor[item.organization] = item.color;
            }
        });
        // 기본값을떄와 수정하기일때를 다르게 해야함
        const changeList = bookedlist.filter((item, index, array) => {
            return array.indexOf(item) === index;
        });

        setOrganizationColor(organizationColor);
        setBookedList(changeList);
        setBookedRoom(bookedRoom);

        // 기본값이 아닌 경우
    };

    // ====================================================================================================
    /**
     *
     * 방 클릭할 경우 이벤트
     */
    const roomClickHandler = (room) => {
        // 이미 예약된방 클릭시
        if (bookedList.includes(room)) {
            alert('이미 예약된 방입니다.');
            return;
        }

        // 기본값을 경우 모든 날짜에 대입해야한다.
        if (date === '기본 값') {
            setRoomData((prevRoomData) => {
                const isRoomExists = Object.values(prevRoomData).some((rooms) => rooms.includes(room));
                if (isRoomExists) {
                    // 이미 존재하는 경우 해당 방을 제외
                    const updatedRoomData = {};
                    Object.keys(prevRoomData).forEach((date) => {
                        updatedRoomData[date] = prevRoomData[date].filter((r) => r !== room);
                    });
                    return updatedRoomData;
                } else {
                    // 이미 존재하지 않는 경우 해당 방을 추가
                    const updatedRoomData = {};
                    Object.keys(prevRoomData).forEach((date) => {
                        updatedRoomData[date] = [...prevRoomData[date], room];
                    });
                    return updatedRoomData;
                }
            });
        } else {
            setRoomData((prevRoomData) => {
                const isRoomExists = prevRoomData[date].includes(room);
                if (isRoomExists) {
                    // 이미 존재하는 경우 해당 방을 제외
                    const updatedRoomData = { ...prevRoomData };
                    updatedRoomData[date] = prevRoomData[date].filter((r) => r !== room);
                    return updatedRoomData;
                } else {
                    // 이미 존재하지 않는 경우 해당 방을 추가
                    const updatedRoomData = { ...prevRoomData };
                    updatedRoomData[date] = [...prevRoomData[date], room];
                    return updatedRoomData;
                }
            });
        }
    };
    // ====================================================================================================
    /**
     * roomData 데이터가 변경될때마다 공통인걸 계산해야할듯
     */
    const [commonRoom, setCommonRoom] = useState([]);
    useEffect(() => {
        // 공통된 방을 찾아서 리스트에 넣어야한다.
        const commonItems = findCommonItems(roomData);
        setCommonRoom(commonItems);
    }, [roomData]);

    const findCommonItems = (data) => {
        let overlappingValues = [];
        // 모든 방 목록을 배열로 가져옴
        Object.keys(data).map((date, index) => {
            const currentDateArray = data[date];
            if (overlappingValues.length === 0) {
                // overlappingValues가 비어있다면 현재 날짜의 배열을 overlappingValues로 복사
                overlappingValues = [...currentDateArray];
            } else {
                // 현재 날짜의 배열과 overlappingValues 배열을 비교하여 겹치는 값들만 남기기
                overlappingValues = overlappingValues.filter((value) => currentDateArray.includes(value));
            }
        });
        return overlappingValues;
    };
    // ====================================================================================================
    // 리스트 2개 비교해서 방 선택 개수 구하기
    const [soloRoom, setSoloRoom] = useState(0);
    const [doubleRoom, setDoubleRoom] = useState(0);
    const [quadRoom, setQuadRoom] = useState(0);

    useEffect(() => {
        if (!roomData[date]) return;
        if (date === '기본 값') {
            const solo = countDuplicates(commonRoom, roomType[1]);
            const double = countDuplicates(commonRoom, roomType[2]);
            setSoloRoom(solo);
            setDoubleRoom(double);
            setQuadRoom(commonRoom.length - (solo + double));
        } else {
            const solo = countDuplicates(roomData[date], roomType[1]);
            const double = countDuplicates(roomData[date], roomType[2]);
            setSoloRoom(solo);
            setDoubleRoom(double);
            setQuadRoom(roomData[date].length - (solo + double));
        }
    }, [roomData]);

    useEffect(() => {
        const solo = countDuplicates(commonRoom, roomType[1]);
        const double = countDuplicates(commonRoom, roomType[2]);
        setSoloRoom(solo);
        setDoubleRoom(double);
        setQuadRoom(commonRoom.length - (solo + double));
    }, [commonRoom]);

    useEffect(() => {
        if (!roomData[date]) return;
        if (date === '기본 값') {
            const solo = countDuplicates(commonRoom, roomType[1]);
            const double = countDuplicates(commonRoom, roomType[2]);
            setSoloRoom(solo);
            setDoubleRoom(double);
            setQuadRoom(commonRoom.length - (solo + double));
        } else {
            const solo = countDuplicates(roomData[date], roomType[1]);
            const double = countDuplicates(roomData[date], roomType[2]);
            setSoloRoom(solo);
            setDoubleRoom(double);
            setQuadRoom(roomData[date].length - (solo + double));
        }
    }, [date]);

    function countDuplicates(arr1, arr2) {
        let count = 0;
        const set = new Set(arr1); // 첫 번째 배열을 Set으로 변환하여 중복된 항목을 제거
        for (let item of arr2) {
            if (set.has(item)) {
                // 두 번째 배열의 각 항목이 첫 번째 배열에 존재하는지 확인
                count++;
            }
        }
        return count;
    }

    useEffect(() => {
        console.log('roomData : ', roomData);
        // console.log(bookedList);
        // console.log('bookedRoom : ', bookedRoom);
        // console.log(organizationColor);
    });

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
                            style={{
                                flex: 1,
                                width: '100%',
                                background: bookedList.includes(room)
                                    ? bookedRoom[room]
                                    : date === '기본 값' && commonRoom.includes(room)
                                    ? selectedColor
                                    : date !== '기본 값' && roomData[date].includes(room)
                                    ? selectedColor
                                    : 'white',
                                cursor: 'pointer',
                            }}
                            onClick={() => roomClickHandler(room)}
                        ></div>
                    </div>
                );
            })}
            <div className={styles.firstFloor}>1F</div>
            <div className={styles.secondFloor}>2F</div>
            <div className={styles.organizationColor}>
                {Object.keys(organizationColor).map((organization, index) => {
                    return (
                        <div key={index} className={styles.colorBox}>
                            <div
                                style={{
                                    backgroundColor: organizationColor[organization],
                                    width: '50px',
                                    height: '20px',
                                    marginLeft: 5,
                                }}
                            ></div>
                            <div>{organization}</div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.selectRoomCount}>
                <table border={1} className={styles.table}>
                    <thead>
                        <tr>
                            <th>1인실</th>
                            <th>2인실</th>
                            <th>4인실</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{soloRoom}개</td>
                            <td>{doubleRoom}개</td>
                            <td>{quadRoom}개</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Rooms;
