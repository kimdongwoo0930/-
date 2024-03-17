import React, { useEffect } from 'react';
import styles from '@/styles/admin/Reservation/Reservation.module.css';
import ColorList from './Inputs/ColorList';
import { useState, useRef } from 'react';
import ClassRoomSelector from './Inputs/ClassRoomSelector';
import getDates from '@/Utils/GetDates';
import Rooms from './Inputs/Room/Rooms';
import Restaurant from './Inputs/Room/Restaurant';
import useAxiosPost from '@/Hooks/admin/PostApi';
import useAxiosGet from '@/Hooks/admin/GetApi';
import * as OpenPopup from '@/Utils/OpenPopup';
import { loadReservationGET } from '@/Api/admin/GetApi';
import { updateReservation } from '@/Api/admin/PostApi';

import { CSSTransition, Transition } from 'react-transition-group';

const Reservation = ({ openTab, loadData, setLoadData, setModal, setSaveData, setAddReservationTab, Tab }) => {
    // 사이 기간 리스트
    const [dateList, setDateList] = useState([]);
    // 선택된 날짜
    const [selectDate, setSelectDate] = useState('기본 값');

    /**
     * 수정하기 부분
     */
    useEffect(() => {
        if (Object.keys(loadData).length !== 0) {
            setOrganization(loadData.organization);
            setColor(loadData.color_code);
            setAddress(loadData.address);
            setPurpose(loadData.purpose);
            setPeople(loadData.people);
            setStartDate(loadData.startdate);
            setEndDate(loadData.enddate);
            setClassRoom(loadData.classroom);
            setCustomerName(loadData.customer);
            setCustomerPhone1(loadData.customer_phone);
            setCustomerPhone2(loadData.customer_phone2);
            setCustomerEmail(loadData.customer_email);
            setReservationState(loadData.status);
            setMemo(loadData.memo);
            const roomData = makeRoomData(loadData.rooms, loadData.startdate, loadData.enddate);
            setRoomData(roomData);
            setRestaurantData(loadData.restaurant);
            setReservationId(loadData.reservationId);
            setSelectDate(loadData.startdate);
        } else {
            setOrganization('');
            setColor('red');
            setAddress('');
            setPurpose('');
            setPeople(0);
            setStartDate('');
            setEndDate('');
            setClassRoom({});
            setCustomerName('');
            setCustomerPhone1('');
            setCustomerPhone2('');
            setCustomerEmail('');
            setReservationState('문의');
            setMemo('');
            setRoomData({});
            setRestaurantData({});
            setReservationId(null);
            setSelectDate('기본 값');
        }
        setLoadData({});
    }, [Tab]);

    const makeRoomData = (data, start_date, end_date) => {
        const datelist = getDates(start_date, end_date);

        const rooms = {};
        datelist.slice(0, -1).map((date) => {
            if (data.hasOwnProperty(date)) {
                rooms[date] = data[date];
            } else if (!data.hasOwnProperty(date)) {
                rooms[date] = [];
            }
        });
        return rooms;
    };
    // ==============================================================

    /**
     * 종료 시 리스너
     */
    useEffect(() => {
        return () => {
            console.log('종료');
            setLoadData({});
            // localStorage.removeItem('load-reservationId');
            // clearInterval(timeRef.current);
            // timeRef.current = null;
        };
    }, []);

    // ==============================================================

    /**
     * 전송 데이터 저장 State
     */

    // 예약 고유번호
    const [reservationId, setReservationId] = useState(null);
    // 기업명, 기업 색
    const [organization, setOrganization] = useState('');
    const [color, setColor] = useState('red');
    // 주소, 과정 명
    const [address, setAddress] = useState('');
    const [purpose, setPurpose] = useState('');
    // 인원수, 예약 날짜
    const [people, setPeople] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // 강의실 선택
    const [classRoom, setClassRoom] = useState({});
    // 담당자 정보
    const [customerName, setCustomerName] = useState('');
    const [customerPhone1, setCustomerPhone1] = useState('');
    const [customerPhone2, setCustomerPhone2] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    // 예약 상태
    const [reservationState, setReservationState] = useState('문의');
    // 예약 메모
    const [memo, setMemo] = useState('');
    // 객실 데이터
    const [roomData, setRoomData] = useState({});
    // 식수 데이터
    const [restaurantData, setRestaurantData] = useState({});

    // useEffect(() => {
    //     console.log('아이디', reservationId);
    //     console.log('기업 명: ', organization);
    //     console.log('색: ', color);
    //     console.log('주소: ', address);
    //     console.log('목적: ', purpose);
    //     console.log('인원수: ', people);
    //     console.log('시작 날짜: ', startDate);
    //     console.log('종료 날짜: ', endDate);
    //     console.log('강의실: ', classRoom);
    //     console.log('담당자 명: ', customerName);
    //     console.log('전화번호: ', customerPhone1);
    //     console.log('보조 전화번호: ', customerPhone2);
    //     console.log('이메일: ', customerEmail);
    //     console.log('예약 상태: ', reservationState);
    //     console.log('메모: ', memo);
    //     console.log('객실 데이터: ', roomData);
    //     console.log('식수 데이터: ', restaurantData);
    // });

    useEffect(() => {
        if (!startDate || !endDate) return;
        if (startDate > endDate) {
            alert('날짜를 다시 선택해주세요.');
            setEndDate('');
            return;
        }
        const dateList = getDates(startDate, endDate);
        setDateList(dateList);
        if (!reservationId) {
            const room = {};
            const restaurant = {};

            dateList.slice(0, -1).map((date) => {
                if (roomData.hasOwnProperty(date)) {
                    room[date] = roomData[date];
                } else if (!roomData.hasOwnProperty(date)) {
                    room[date] = [];
                }
            });
            dateList.map((date) => {
                if (!restaurantData.hasOwnProperty(date)) {
                    restaurant[date] = {
                        breakfast: 0,
                        lunch: 0,
                        dinner: 0,
                        special: '없음',
                    };
                } else if (restaurantData.hasOwnProperty(date)) {
                    restaurant[date] = restaurantData[date];
                }
            });

            setRestaurantData(restaurant);

            setRoomData(room);
        } else if (reservationId) {
            const room = {};
            const restaurant = {};
            dateList.map((date) => {
                if (roomData.hasOwnProperty(date)) {
                    room[date] = roomData[date];
                } else if (!roomData.hasOwnProperty(date)) {
                    room[date] = [];
                }
                if (!restaurantData.hasOwnProperty(date)) {
                    restaurant[date] = {
                        breakfast: 0,
                        lunch: 0,
                        dinner: 0,
                        special: '없음',
                    };
                } else if (restaurantData.hasOwnProperty(date)) {
                    restaurant[date] = restaurantData[date];
                }
            });
            setRestaurantData(restaurant);
            setRoomData(room);
        }
        // TODO : 식수 데이터도 수정해야하는데 이건 잘되는거같기도하고 하지만 데이터는 남는듯
    }, [startDate, endDate]);

    /**
     * 
     * 교육 기간 뒷부분이 변경될 경우 restaurant와 roomData를 변경해야한다.
     * /
     * 

    // ==============================================================

    /**
     * 예약 데이터 저장하기
     */
    const submitHandler = () => {
        // 기관명만 있다면 일단 저장하기
        if (organization === '') {
            alert('업체 명을 입력해주세요.');
            return;
        }
        if (!startDate || !endDate) {
            alert('날짜를 선택해주세요.');
            return;
        }
        if (!reservationId) {
            const Data = {
                organization: organization,
                color_code: color,
                address: address,
                purpose: purpose,
                people: people,
                classroom: classRoom,
                startdate: startDate,
                enddate: endDate,
                customer: customerName,
                customer_phone: customerPhone1,
                customer_phone2: customerPhone2,
                customer_email: customerEmail,
                rooms: roomData,
                restaurant: restaurantData,
                status: reservationState,
                memo: memo,
            };
            setSaveData(Data);
            setModal(true);
        } else if (reservationId) {
            const Data = {
                reservationId: reservationId,
                organization: organization,
                color_code: color,
                address: address,
                purpose: purpose,
                people: people,
                classroom: classRoom,
                startdate: startDate,
                enddate: endDate,
                customer: customerName,
                customer_phone: customerPhone1,
                customer_phone2: customerPhone2,
                customer_email: customerEmail,
                rooms: roomData,
                restaurant: restaurantData,
                status: reservationState,
                memo: memo,
            };
            update(Data);
        }
        // 예약 번호가 없다면 새로운 등록으로 들어가야한다.
        // fetchData(process.env.NEXT_PUBLIC_CREATE_RESERVATION, Data);
        // 수정부분을 만들자
    };

    const update = async (Data) => {
        const response = await updateReservation(Data);
        console.log(response);
        if (response.status === 'OK') {
            alert('수정되었습니다.');
            setAddReservationTab(false);
            // 새로고침해야함
            window.location.reload();
        }
    };

    // ==============================================================

    /**
     * 모달 부분
     */

    return (
        <CSSTransition
            in={Tab}
            timeout={1000}
            mountOnEnter
            unmountOnExit
            classNames={{
                enter: `${styles.animate_enter}`,
                enterActive: `${styles.animate_enter_active}`,
                exit: `${styles.animate_exit}`,
                exitActive: `${styles.animate_exit_active}`,
            }}
        >
            <div className={styles.Body}>
                {/* 모달창 */}

                <div className={styles.Header}>
                    {reservationId ? <span id={'헤더'}>예약 수정</span> : <span id={'헤더'}>예약 추가</span>}
                    <div>
                        <button onClick={() => openTab(false)}>닫기</button>
                        {/* <button
                        onClick={() => {
                            loadHandler();
                            OpenPopup.openLoad();
                        }}
                    >
                        불러오기 */}
                        {/* </button> */}
                        {reservationId ? (
                            <button onClick={() => submitHandler()}>수정하기</button>
                        ) : (
                            <button onClick={() => submitHandler()}>저장하기</button>
                        )}
                    </div>
                </div>

                {/* 빈칸들 컨테이너 */}

                <div className={styles.Container}>
                    {/* 업체명, 업체 색 */}
                    <div className={styles.NameColor}>
                        <div className={styles.Name}>
                            <div className={styles.titleBox}>업체 명</div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    onChange={(e) => setOrganization(e.target.value)}
                                    value={organization}
                                />
                            </div>
                        </div>
                        <div className={styles.Color}>
                            <div className={styles.titleBox}>색 선택</div>
                            <div className={styles.colorBox}>
                                <ColorList Color={color} setColor={setColor} />
                            </div>
                        </div>
                    </div>
                    {/* 주소, 과정명 */}
                    <div className={styles.AddressPurpose}>
                        <div className={styles.address}>
                            <div className={styles.titleBox}>주소</div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                />
                            </div>
                        </div>
                        <div className={styles.purpose}>
                            <div className={styles.titleBox}>과정명</div>
                            <div className={styles.inputBox}>
                                <input
                                    type="text"
                                    className={styles.input}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    value={purpose}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 인원수, 예약 날짜 */}
                    <div className={styles.PeopleDate}>
                        <div className={styles.people}>
                            <div className={styles.titleBox}>교육생 수</div>
                            <div className={styles.inputBox}>
                                <input
                                    type="number"
                                    className={styles.input}
                                    onChange={(e) => setPeople(e.target.value)}
                                    min={0}
                                    max={999}
                                    value={people}
                                />
                                <span>명</span>
                            </div>
                        </div>
                        <div className={styles.date}>
                            <div className={styles.titleBox}>교육 기간</div>
                            <div className={styles.inputBox}>
                                <input
                                    type="date"
                                    className={styles.input}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={startDate}
                                />
                                <input
                                    type="date"
                                    className={styles.input}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                />
                            </div>
                        </div>
                    </div>
                    {/* 강의실 선택 + - 가능해야한다. */}
                    <div className={styles.ClassRoom}>
                        <div className={styles.titleBox}>강의실</div>
                        <div className={styles.inputBox}>
                            <ClassRoomSelector
                                classRoom={classRoom}
                                setClassRoom={setClassRoom}
                                reservationId={reservationId}
                                setRestaurant={setRestaurantData}
                                setRoom={setRoomData}
                            />
                        </div>
                    </div>
                    {/* 담당자 정보 */}
                    <div className={styles.CustomerInfo}>
                        <div>
                            <div className={styles.NameEmail}>
                                <div className={styles.name}>
                                    <div className={styles.titleBox}>담당자 명</div>
                                    <div className={styles.inputBox}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            value={customerName}
                                        />
                                    </div>
                                </div>
                                <div className={styles.email}>
                                    <div className={styles.titleBox}>이메일</div>
                                    <div className={styles.inputBox}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            value={customerEmail}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.Phone}>
                                <div className={styles.phone1}>
                                    <div className={styles.titleBox}>전화번호</div>
                                    <div className={styles.inputBox}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            onChange={(e) => setCustomerPhone1(e.target.value)}
                                            value={customerPhone1}
                                        />
                                    </div>
                                </div>
                                <div className={styles.phone2}>
                                    <div className={styles.titleBox}>휴대전화</div>
                                    <div className={styles.inputBox}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            onChange={(e) => setCustomerPhone2(e.target.value)}
                                            value={customerPhone2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 에약 상태 */}
                    <div className={styles.State}>
                        <div className={styles.titleBox}>예약 상태</div>
                        <div className={styles.inputBox}>
                            <select onChange={(e) => setReservationState(e.target.value)} value={reservationState}>
                                <option value="문의">문의</option>
                                <option value="예약">예약</option>
                                <option value="확정">확정</option>
                                <option value="취소">취소</option>
                                <option value="만료">만료</option>
                            </select>
                        </div>
                    </div>
                    {/* 메모 */}
                    <div className={styles.Memo}>
                        <div className={styles.titleBox}>메모</div>
                        <div className={styles.inputBox}>
                            <textarea className={styles.input} onChange={(e) => setMemo(e.target.value)} value={memo} />
                        </div>
                    </div>
                    {/* 숙소 표 */}
                    <div className={styles.Room}>
                        <div className={styles.titleBox}>
                            <span>숙소 선택</span>
                            <select onChange={(e) => setSelectDate(e.target.value)} value={selectDate}>
                                {!reservationId && <option value="기본 값">기본 값</option>}
                                {dateList.slice(0, -1).map((date) => (
                                    <option value={date} key={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputBox}>
                            <Rooms
                                color={color}
                                roomData={roomData}
                                setRoomData={setRoomData}
                                date={selectDate}
                                start_date={startDate}
                                end_date={endDate}
                                reservationId={reservationId}
                            />
                        </div>
                    </div>
                    {/*  식수 표  */}
                    <div className={styles.Restaurant}>
                        <div className={styles.titleBox}>
                            <span>식수 표</span>
                        </div>
                        <div className={styles.inputBox}>
                            {dateList.map((date) => (
                                <Restaurant
                                    key={date}
                                    date={date}
                                    restaurantDatas={restaurantData}
                                    setRestaurantDatas={setRestaurantData}
                                    reservationId={reservationId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Reservation;
