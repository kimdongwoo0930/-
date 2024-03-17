import React from 'react';
import { useState, useEffect } from 'react';
import { LuPlusCircle } from 'react-icons/lu';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import useAxiosPost from '@/Hooks/admin/PostApi';

const ClassRoomSelector = ({ setClassRoom, classRoom, reservationId }) => {
    const [roomSize, setRoomSize] = useState([]);
    const [roomCount, setRoomCount] = useState(classRoom.length ? classRoom.length + 1 : 1);
    const [roomName, setRoomName] = useState([]);
    const { data, error, loading, url, fetchData } = useAxiosPost();

    useEffect(() => {
        if (!loading) {
            if (data) {
                if (data.status === 'OK') {
                    alert('예약 가능한 날짜입니다.');
                } else {
                    alert('예약 불가능한 날짜입니다.');
                }
            }
        }
    }, [data, error, loading]);
    /**
     *  데이터 구조
     *
     * 1. 강의실을 선택할경우 roomSize리스트로 ["대강의실"]
     * 2. 강의실 호수 설정시 roomName ["105 / 120인" ,"201 / 30인" ]
     */

    /**
     *
     * 날짜 입력 함수
     */
    const setRoomRangeHandler = (e, index, num) => {
        // '201' : [2024-01-01, 2024-01-02]

        /**
         * 두 날짜가 모두 입력되면 서버에 확인 GET요청으로 중복 확인
         */
        // 날짜 올바르게 입력됬는지 검사
        const roomname = roomName[index];
        const ClassRoom = classRoom[roomname] ? classRoom[roomname] : [];
        if (new Date(e.target.value) < new Date(ClassRoom[0]) && num === 1) {
            alert('올바른 날짜를 입력해주세요.');
            return;
        }
        // 앞에 날짜를 변경하면 뒷 날짜도 초기화
        if (num === 0) {
            ClassRoom[1] = '';
        }

        ClassRoom[num] = e.target.value;

        if (
            classRoom[roomname]?.length === 2 &&
            classRoom[roomname][0] !== '' &&
            classRoom[roomname][1] !== '' &&
            num === 1
        ) {
            fetchData(process.env.NEXT_PUBLIC_CHECK_RESERVATION_DATE, {
                start_date: ClassRoom[0],
                end_date: ClassRoom[1],
                class_room: roomname,
            });
        }

        setClassRoom({ ...classRoom, [roomname]: ClassRoom });
    };

    const minusRoomHandler = () => {
        // 제거하면 리스트에서 제거, 날짜 초기화

        const updatedRoomName = [...roomName]; // roomName 배열의 복사본을 만듭니다.
        const removedRoom = updatedRoomName.pop(); // 배열의 마지막 요소를 제거하고 해당 값을 removedRoom에 할당합니다.

        // classRoom에서 해당 방을 삭제합니다.
        const updatedClassRoom = { ...classRoom }; // classRoom 객체의 복사본을 만듭니다.
        delete updatedClassRoom[removedRoom]; // 해당 방을 삭제합니다.

        // 변경된 상태를 업데이트합니다.
        setRoomName(updatedRoomName); // 변경된 roomName을 설정합니다.
        setClassRoom(updatedClassRoom); // 변경된 classRoom을 설정합니다.
        setRoomCount(roomCount - 1);
    };

    /**
     *
     * 강의실 크기 결졍
     */
    const setRoomSizeHandler = (e, index) => {
        // 중간에 강의실을 변경하면 기존 강의실 정보를 초기화 또는 날짜 초기화
        // 날짜 제거
        // if (roomName[index]) {
        // 강의실 호수가 있다면 초기화해야한다.
        setRoomName((prevRoomName) => {
            const updatedRoomName = [...prevRoomName];
            updatedRoomName[index] = '선택';
            return updatedRoomName;
        });
        // }

        if (classRoom[roomName[index]]) {
            setClassRoom((prevClassRoom) => {
                const updatedClassRoom = { ...prevClassRoom };
                delete updatedClassRoom[roomName[index]];
                return updatedClassRoom;
            });
        }

        const updatedRoomSize = [...roomSize];
        updatedRoomSize[index] = e.target.value;
        setRoomSize(updatedRoomSize);
        console.log(updatedRoomSize[index]);

        return updatedRoomSize[index];

        // const name = roomName[index] ? roomName[index] : '';
        // const ClassRoom = classRoom;
        // delete ClassRoom[name];
        // setClassRoom(ClassRoom);
        // // Name 제거
        // const lists = roomName;
        // lists[index] = '선택';
        // setRoomName(lists);
        // //
        // const list = [...roomSize];
        // list[index] = e.target.value;
        // setRoomSize(list);
    };

    /**
     *
     * 강의실 호수 설정 함수
     */
    const setClassRoomHandler = (e, index) => {
        const roomNameValue = e.target.value.split(' / ')[0];

        // classRoom 상태 업데이트
        if (classRoom[roomNameValue]) {
            setClassRoom((prevClassRoom) => ({
                ...prevClassRoom,
                [roomNameValue]: [],
            }));
        }

        // roomName 상태 업데이트
        setRoomName((prevRoomName) => {
            const updatedRoomName = [...prevRoomName];
            updatedRoomName[index] = roomNameValue;
            return updatedRoomName;
        });
    };

    /**
     * 처음 classRoom에 데이터가 있다면 초기값 설정
     */
    useEffect(() => {
        if (Object.keys(classRoom).length > 0 && reservationId) {
            Object.keys(classRoom).map((key, index) => {
                const list = roomSize;
                list[index] = findRoomKey(key);
                setRoomSize(list);
                const name = roomName;
                name[index] = key;
                setRoomName(name);
            });
            setRoomCount(Object.keys(classRoom).length);
        }
    }, [reservationId]);

    useEffect(() => {
        console.log('roomSize : ', roomSize);
        console.log('roomName : ', roomName);
        console.log('classRoom : ', classRoom);
    }, [roomSize, roomName, classRoom]);

    function findRoomKey(roomNumber) {
        for (let roomType in rooms) {
            const roomList = rooms[roomType];
            for (let room of roomList) {
                const [number] = room.split(' / ');
                if (number === roomNumber) {
                    return roomType;
                }
            }
        }
        return null; // 해당 번호에 대한 방이 없는 경우
    }

    function getRoomInfo(roomNumber) {
        for (let roomType in rooms) {
            const roomList = rooms[roomType];
            for (let room of roomList) {
                const [number] = room.split(' / ');
                if (number === roomNumber) {
                    return room;
                }
            }
        }
        return null; // 해당 번호에 대한 강의실이 없는 경우
    }

    return (
        <div>
            {Array.from({ length: roomCount }, (_, index) => {
                return (
                    <div style={{ display: 'flex' }}>
                        <select onChange={(e) => setRoomSizeHandler(e, index)} value={roomSize[index]}>
                            <option value="선택">선택</option>
                            <option value="대강의실">대강의실</option>
                            <option value="중강의실">중강의실</option>
                            <option value="소강의실">소강의실</option>
                            <option value="분임실">분임실</option>
                            <option value="다목적실">다목적실</option>
                        </select>

                        <select
                            onChange={(e) => setClassRoomHandler(e, index)}
                            value={getRoomInfo(roomName[index]) || '선택'}
                            disabled={!roomSize[index] || roomSize[index] === '선택'}
                        >
                            <option value="선택">선택</option>
                            {rooms[roomSize[index]]?.map((room) => (
                                <option value={room}>{room}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            onChange={(e) => setRoomRangeHandler(e, index, 0)}
                            value={classRoom[roomName[index]] ? classRoom[roomName[index]][0] : ''}
                            disabled={!roomName[index] || roomName[index] === '선택'}
                        />
                        <input
                            type="date"
                            onChange={(e) => setRoomRangeHandler(e, index, 1)}
                            value={classRoom[roomName[index]] ? classRoom[roomName[index]][1] : ''}
                            disabled={!roomName[index] || roomName[index] === '선택'}
                        />

                        {index === roomCount - 1 && (
                            <>
                                <div onClick={() => setRoomCount(roomCount + 1)}>
                                    <LuPlusCircle size={15} />
                                </div>
                                {index !== 0 && (
                                    <div onClick={minusRoomHandler}>
                                        <AiOutlineMinusCircle size={15} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const rooms = {
    대강의실: ['105 / 120인'],
    중강의실: ['201 / 70인', '203 / 50인', '204 / 50인'],
    소강의실: ['101 / 30인', '102 / 20인', '103 / 30인', '202 / 30인'],
    분임실: ['106 / 12인', '107 / 12인', '205 / 12인', '206 / 12인'],
    다목적실: ['A', 'B'],
};

export default ClassRoomSelector;
