import React, { useEffect, useRef } from 'react';
import styles from '@/styles/admin/Reservation/Load/load.module.css';
import { useState } from 'react';
import useAxiosGet from '@/Hooks/admin/GetApi';
import { SiCodereview } from 'react-icons/si';
import { searchRecord } from '@/Api/admin/GetApi';
import { useRouter } from 'next/router';

const load = () => {
    const router = useRouter();

    const [organization, setOrganization] = useState('');

    const [reservationData, setReservationData] = useState([]);
    const [state, setState] = useState(false);

    /**
     *
     * 검색 관련 함수들
     */
    const searchHandler = async () => {
        if (!organization) return;
        setState(false);
        // 서버에 검색 요청
        const response = await searchRecord(organization);

        if (response.status === 'OK') {
            setState(true);
            setReservationData(response.data);
        } else {
            setState(false);
        }
    };

    /**
     * 회사명을 입력후 엔터를 누른다면
     */
    const enterHandler = (e) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };

    return (
        <div className={styles.Main}>
            <div className={styles.Header}>
                <span>기록</span>
            </div>
            <div className={styles.Body}>
                <div className={styles.container}>
                    <div className={styles.search}>
                        <span>업체 명 : </span>
                        <input type="text" onChange={(e) => setOrganization(e.target.value)} onKeyDown={enterHandler} />
                        <button onClick={() => searchHandler()}>검색</button>
                    </div>
                    <div className={styles.list}>
                        <table>
                            <thead>
                                <tr>
                                    <th>업체명</th>
                                    <th>예약 날짜</th>
                                    <th>담당자</th>
                                    <th>예약 상태</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state &&
                                    reservationData.map((data, index) => {
                                        const date = `${data.start_date} ~ ${data.end_date}`;
                                        return (
                                            <tr key={data.reservationId} className={styles.listtr}>
                                                <td className={styles.organization}>{data.organization}</td>
                                                <td className={styles.date}>{date}</td>
                                                <td className={styles.customer}>{data.customer}</td>
                                                <td className={styles.state}>{data.status}</td>
                                                <td className={styles.load}>
                                                    <SiCodereview
                                                        className={styles.loadBtn}
                                                        onClick={() => router.push(`/admin/load/${data.reservationId}`)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {!state && (
                                    <tr>
                                        <td colSpan="5">검색 결과가 없습니다.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default load;
