import React, { useEffect } from 'react';
import styles from '@/styles/admin/Reservation/Load/Detail.module.css';

import data from '@/Data/admin/data';
import { useState, useRef } from 'react';
import RoomDetail from './RoomDetail';
import getDates from '@/Utils/GetDates';

import { CSSTransition, Transition } from 'react-transition-group';
import { getPermission } from '@/Api/auth/GetApi';
import { DetailLoading } from '@/Component/Loading/Loading';

const Detail = ({ openTab, setLoadData, setCreateTab, loadData, Tab, Loading }) => {
    const Data = loadData;
    const [dateList, setDateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    // ====================================================================================================

    // useEffect(() => {
    //     setAnimate(true);
    //     console.log(Tab);
    //     return () => {
    //         setAnimate(false);
    //         console.log('종료');
    //     };
    // }, []);

    /**
     * 애니메이션 부분
     */

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setAnimate(false);
    //     }, 500); // 애니메이션 지속 시간에 따라 타임아웃 설정 (여기서는 300ms)
    //     return () => clearTimeout(timeout); // cleanup 함수를 이용하여 타임아웃 클리어
    // }, [animate]);

    // ====================================================================================================

    /**
     * 날짜 계산
     */
    useEffect(() => {
        // console.log(Data);
        const list = getDates(Data.startdate, Data.enddate);
        setDateList(list);
        setSelectedDate(list[0]);
    }, [loadData]);

    /**
     * 수정하기 누르는 경우
     */
    // 권한 검사해야함
    const modifyHandler = async () => {
        const response = await getPermission();
        if (response === 200) {
            setLoadData(Data);
            openTab(false);
            setCreateTab(true);
        } else if (response?.response?.status === 500) {
            // 토큰 만료
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            window.location.href = '/admin/auth/login';
        } else {
            alert('접근 권한이 없습니다.');
        }
    };

    // 애니메이션해보자

    // 데이터를 가져오는 동안 추 후에 로딩창 만들기

    return (
        <div className={`${styles.main}`}>
            {Loading && <DetailLoading />}
            {!Loading && (
                <>
                    <div className={styles.title}>
                        <h2>상세 예약</h2>
                        <div>
                            <button style={{ background: '#3498db', color: 'white' }} onClick={() => modifyHandler()}>
                                수정
                            </button>
                            <button
                                onClick={() => {
                                    openTab(false);
                                    setLoadData({});
                                }}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                    <div className={styles.Container}>
                        <div className={styles.NameColor}>
                            <div className={styles.Name}>
                                <div className={styles.titleBox}>업체 명</div>
                                <div className={styles.inputBox}>{Data.organization}</div>
                            </div>
                            <div className={styles.Color}>
                                <div className={styles.titleBox}>색</div>
                                <div className={styles.colorBox}>
                                    <div style={{ backgroundColor: Data.color_code }}></div>
                                </div>
                            </div>
                        </div>
                        {/* 주소, 과정명 */}
                        <div className={styles.AddressPurpose}>
                            <div className={styles.address}>
                                <div className={styles.titleBox}>주소</div>
                                <div className={styles.inputBox}>{Data.address}</div>
                            </div>
                            <div className={styles.purpose}>
                                <div className={styles.titleBox}>과정명</div>
                                <div className={styles.inputBox}>{Data.purpose}</div>
                            </div>
                        </div>
                        {/* 인원수, 예약 날짜 */}
                        <div className={styles.PeopleDate}>
                            <div className={styles.people}>
                                <div className={styles.titleBox}>교육생 수</div>
                                <div className={styles.inputBox}>
                                    <span>{Data.people} 명</span>
                                </div>
                            </div>
                            <div className={styles.date}>
                                <div className={styles.titleBox}>교육 기간</div>
                                <div className={styles.inputBox}>
                                    {Data.startdate} ~ {Data.enddate}
                                </div>
                            </div>
                        </div>
                        {/* 강의실 선택 + - 가능해야한다. */}
                        <div className={styles.ClassRoom}>
                            <div className={styles.titleBox}>강의실</div>
                            <div className={styles.inputBox}>
                                {Object.keys(Data.classroom).map((room, index) => {
                                    return (
                                        <div className={styles.room} key={index}>
                                            <div className={styles.roomName}>{room}호 :</div>
                                            <div className={styles.roomDate}>
                                                {Data.classroom[room][0]} ~ {Data.classroom[room][1]}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* 담당자 정보 */}
                        <div className={styles.CustomerInfo}>
                            <div>
                                <div className={styles.NameEmail}>
                                    <div className={styles.name}>
                                        <div className={styles.titleBox}>담당자 명</div>
                                        <div className={styles.inputBox}>{Data.customer}</div>
                                    </div>
                                    <div className={styles.email}>
                                        <div className={styles.titleBox}>이메일</div>
                                        <div className={styles.inputBox}>{Data.customer_email}</div>
                                    </div>
                                </div>
                                <div className={styles.Phone}>
                                    <div className={styles.phone1}>
                                        <div className={styles.titleBox}>전화번호</div>
                                        <div className={styles.inputBox}>{Data.customer_phone}</div>
                                    </div>
                                    <div className={styles.phone2}>
                                        <div className={styles.titleBox}>휴대전화</div>
                                        <div className={styles.inputBox}>{Data.customer_phone2}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 에약 상태 */}
                        <div className={styles.State}>
                            <div className={styles.titleBox}>예약 상태</div>
                            <div className={styles.inputBox}>{Data.status}</div>
                        </div>
                        {/* 메모 */}
                        <div className={styles.Memo}>
                            <div className={styles.titleBox}>메모</div>
                            <div className={styles.inputBox}>
                                <textarea className={styles.input} value={Data.memo} readOnly />
                            </div>
                        </div>
                        <div className={styles.Room}>
                            <div className={styles.RoomBox}>
                                <span>날짜 선택</span>
                                <select onChange={(e) => setSelectedDate(e.target.value)}>
                                    {dateList.slice(0, -1).map((date) => (
                                        <option value={date}>{date}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.roomDetail}>
                                <RoomDetail selectedDate={selectedDate} rooms={Data.rooms} color={Data.color_code} />
                            </div>
                        </div>
                        <div className={styles.restaurant}>
                            <div className={styles.restaurantBox}>
                                <span>식수 표</span>
                            </div>
                            {dateList.map((item, index) => {
                                const data = Data.restaurant[item];
                                return (
                                    <div className={styles.restaurantDetail}>
                                        <span>{item}</span>
                                        <div className={styles.restaurantDetailBox}>
                                            <div>조식 : {data?.breakfast} 명</div>
                                            <div>중식 : {data?.lunch} 명</div>
                                            <div>석식 : {data?.dinner} 명</div>
                                            <div>특식 : {data?.special}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
