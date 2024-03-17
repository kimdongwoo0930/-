import React from 'react';
import styles from '@/styles/admin/Modal/saveModal.module.css';
import { addReservation } from '@/Api/admin/PostApi';

const BeforeSave = ({ setModal, Data }) => {
    /**
     * 저장하기 누를시 그때 서버로 전송하기
     */
    /**
     *    private String organization;
            private String color_code;
            private String address;
            private String purpose;
            private Integer people;
            private String startdate;
            private String enddate;
            private String customer;
            private String customer_phone;
            private String customer_phone2;
            private String customer_email;
            private Map<String,List<String>> classroom;
            private Map<String, List<String>> rooms;
            private Map<String,Map<String,?>> restaurant;
            private String status;
            private String memo;
     */

    const submit = async () => {
        console.log(Data);
        const response = await addReservation(Data);
        console.log(response);
        if (response.status === 'OK') {
            setModal(false);

            alert('저장되었습니다.');
            // 페이지 새로고침 한번해주자
            window.location.reload();
        } else {
            alert('저장에 실패했습니다.');
        }
    };

    return (
        <div className={styles.Main}>
            <div className={styles.Container}>
                <div className={styles.Title}>
                    <h2>저장하기 전에 확인해주세요</h2>
                </div>
                <div className={styles.Content}>
                    <div className={styles.organization}>
                        <div>
                            <span>업체명 : </span>
                            <span>{Data.organization ? Data.organization : 'Blank'}</span>
                        </div>
                        <div>
                            <span>상태 : </span>
                            <span>{Data.status}</span>
                        </div>
                    </div>
                    <div className={styles.date}>
                        <span>교육 날짜 : </span>
                        <span>
                            {Data.startdate} ~ {Data.enddate}
                        </span>
                    </div>
                    <div className={styles.address}>
                        <span>주소 : </span>
                        <span>{Data.address ? Data.address : '미입력'}</span>
                    </div>
                    <div className={styles.peopleANDpurpose}>
                        <div className={styles.people}>
                            <span>교육생 수 : </span>
                            <span>{Data.people} 명</span>
                        </div>
                        <div className={styles.purpose}>
                            <span>과정명 : </span>
                            <span>{Data.purpose ? Data.purpose : '미입력'}</span>
                        </div>
                    </div>

                    <div className={styles.customer}>
                        <div>
                            <div>
                                <span>담당자 : </span>
                                <span> {Data.customer ? Data.customer : '미입력'}</span>
                            </div>
                            <div>
                                <span>이메일 : </span>
                                <span>{Data.customer_email ? Data.customer_email : '미입력'}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>연락처1 : </span>
                                <span>{Data.customer_phone ? Data.customer_phone : '미입력'}</span>
                            </div>
                            <div>
                                <span>연락처2 : </span>
                                <span>{Data.customer_phone2 ? Data.customer_phone2 : '미입력'}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.classRoom}>
                        <span>강의실 : </span>
                        {Object.keys(Data.classroom).length === 0 && <span>미입력</span>}
                        {Data.classroom && (
                            <div>
                                {Object.keys(Data.classroom).length > 0 &&
                                    Object.keys(Data.classroom).map((room, index) => {
                                        return (
                                            <div className={styles.Classroom} key={index}>
                                                <div className={styles.roomName}>{room}호 :</div>
                                                <div className={styles.roomDate}>
                                                    {Data.classroom[room][0]} ~ {Data.classroom[room][1]}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        )}
                    </div>
                    <div className={styles.room}>
                        <span>숙소 : </span>
                        <div>
                            {Data.rooms &&
                                Object.keys(Data.rooms).map((date, index) => {
                                    if (date === '기본 값') return null;
                                    return (
                                        <div className={styles.rooms} key={index}>
                                            <div className={styles.roomName}>
                                                ({Data.rooms[date].length}개) {date} :
                                            </div>
                                            {Data.rooms[date].length === 0 && <span>없음</span>}
                                            {Data.rooms[date].length > 0 && (
                                                <div>
                                                    {Data.rooms[date].length > 0 &&
                                                        Data.rooms[date].map((room, roomIndex) => (
                                                            <div className={styles.roomDate} key={roomIndex}>
                                                                {room},
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.restaurant}>
                        <span>식수 : </span>
                        <div>
                            {Data.restaurant &&
                                Object.keys(Data.restaurant).length > 0 &&
                                Object.keys(Data.restaurant).map((date, index) => {
                                    return (
                                        <div className={styles.restaurants} key={index}>
                                            <div className={styles.roomName}>{date} :</div>
                                            <div>
                                                <div className={styles.roomDate}>
                                                    <span className={styles.firstLetter} style={{ color: '#FFA07A' }}>
                                                        조 : {Data.restaurant[date].breakfast} 명
                                                    </span>{' '}
                                                    <span className={styles.firstLetter} style={{ color: '#00CED1' }}>
                                                        중 : {Data.restaurant[date].lunch} 명
                                                    </span>{' '}
                                                    <span className={styles.firstLetter} style={{ color: '#006400' }}>
                                                        석 : {Data.restaurant[date].dinner} 명
                                                    </span>{' '}
                                                    <span className={styles.firstLetter} style={{ color: '#800080' }}>
                                                        특식 : {Data.restaurant[date].special}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.memo}>
                        <span>메모 : </span>
                        <textarea disabled={true}>{Data.memo}</textarea>
                    </div>

                    <div className={styles.button}>
                        <button onClick={() => submit()}>저장</button>
                        <button onClick={() => setModal(false)}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeforeSave;
