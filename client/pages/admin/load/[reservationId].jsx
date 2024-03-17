import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { loadRecordDetail } from '@/Api/admin/GetApi';

import styles from '@/styles/admin/Reservation/Load/loadDetil.module.css';
import RoomDetail from '@/Component/admin/detail/RoomDetail';

import { RecordLoading } from '@/Component/Loading/Loading';
import getDates from '@/Utils/GetDates';

const RecordDetailPage = () => {
    const router = useRouter();
    const { reservationId } = router.query;

    // 저장 데이터
    const [Data, setLoadData] = useState({});
    const [loading, setLoading] = useState(true);

    // 계산 데이터
    const [dateList, setDateList] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    // 페이지가 처음 시작될때 데이터를 불러온다. 로딩창을 띄워두고
    useEffect(() => {
        const loadData = async () => {
            // 주소에서 예약 번호로 가져와서 불러온다.
            const response = await loadRecordDetail(reservationId);
            if (response.status === 'OK') {
                // 데이터를 세팅한다.
                // console.log(response.data);
                // 데이터를 저장하기전 dateList를 만들어야한다.
                const dates = await getDates(response.data.startdate, response.data.enddate);
                setDateList(dates);
                setLoadData(response.data);
                setLoading(false);
            } else {
                // 에러 처리
                alert('데이터를 불러오는데 실패했습니다.');
            }
        };
        loadData();
    }, []);

    // 데이터 받아오면 날짜 계산

    return (
        <div className={`${styles.main}`}>
            {loading && <RecordLoading />}
            {!loading && (
                <>
                    <div className={styles.title}>
                        <h2>대관 현황</h2>
                        <div>
                            <button
                                onClick={() => {
                                    router.back();
                                }}
                            >
                                뒤로가기
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
                                {Object.keys(Data.classroom).length > 0 ? (
                                    Object.keys(Data.classroom).map((room, index) => (
                                        <div className={styles.room} key={index}>
                                            <div className={styles.roomName}>{room}호 :</div>
                                            <div className={styles.roomDate}>
                                                {Data.classroom[room][0]} ~ {Data.classroom[room][1]}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.noClassRoom}>데이터 없음</div>
                                )}
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
                        {/* 예약 상태 */}
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
                                {Object.keys(Data.rooms).length > 0 && (
                                    <select onChange={(e) => setSelectedDate(e.target.value)}>
                                        {dateList.map((date) => (
                                            <option key={date} value={date}>
                                                {date}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className={styles.roomDetail}>
                                {Object.keys(Data.rooms).length > 0 && (
                                    <RoomDetail
                                        selectedDate={selectedDate}
                                        rooms={Data.rooms}
                                        color={Data.color_code}
                                    />
                                )}
                                {Object.keys(Data.rooms).length === 0 && (
                                    <div className={styles.noRooms}>데이터 없음</div>
                                )}
                            </div>
                        </div>
                        <div className={styles.restaurant}>
                            <div className={styles.restaurantBox}>
                                <span>식수 표</span>
                            </div>

                            {Object.keys(Data.restaurant).length > 0 &&
                                dateList.map((item, index) => {
                                    const data = Data.restaurant[item];
                                    return (
                                        <div key={index} className={styles.restaurantDetail}>
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
                            {Object.keys(Data.restaurant).length === 0 && (
                                <div className={styles.noRestaurant}>데이터 없음</div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecordDetailPage;
