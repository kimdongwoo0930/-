import React from 'react';
import styles from '@/styles/admin/Pdf/Confirmation.module.css';

const Confirmation = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: 'gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className={styles.root}>
                <div className={styles.Container}>
                    <div className={styles.Title}>
                        <span>흥국생명연수원 사용안내 확인서</span>
                        <br />
                        <span>주소: 경기도 용인시 기흥구 중부대로819번길 57-9 흥국생명연수원</span>
                    </div>
                    <div className={styles.content}>
                        <table className={styles.Infotable}>
                            <tbody>
                                <tr>
                                    <td>회사명</td>
                                    <td colSpan={6} style={{ paddingLeft: 10 }}>
                                        흥국생명
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'rgb(253, 19, 249)', fontWeight: 'bold' }}>주소</td>
                                    <td colSpan={6} style={{ paddingLeft: 10 }}></td>
                                </tr>
                                <tr>
                                    <td>신청인</td>
                                    <td style={{ textAlign: 'center' }}>성명</td>
                                    <td style={{ textAlign: 'center' }}>전승은 팀장</td>
                                    <td style={{ textAlign: 'center' }}>연락처</td>
                                    <td style={{ textAlign: 'center' }}>010-1234-5678</td>
                                    <td style={{ textAlign: 'center' }}>E-mail</td>
                                    <td style={{ textAlign: 'center' }}>zoe.leader1203@gmail.com</td>
                                </tr>
                                <tr>
                                    <td>현장 담당자</td>
                                    <td style={{ textAlign: 'center' }}>성명</td>
                                    <td></td>
                                    <td style={{ textAlign: 'center' }}>연락처</td>
                                    <td></td>
                                    <td colSpan={2} style={{ paddingLeft: 10 }}>
                                        신청인 : 상동
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width: '95%', borderCollapse: 'collapse' }} className={styles.purpose}>
                            <tbody>
                                <tr>
                                    <td style={{ color: 'rgb(253,19,249)', fontWeight: 'bold' }}>과정명</td>
                                    <td colSpan={6} style={{ background: 'rgb(191,219,174)' }}></td>
                                </tr>
                                <tr>
                                    <td>일 정</td>
                                    <td>입소</td>
                                    <td>20203.04.06 (목)</td>
                                    <td>퇴소</td>
                                    <td>20203.04.07 (금)</td>
                                </tr>
                                <tr>
                                    <td>인 원</td>
                                    <td></td>
                                    <td style={{ background: 'rgb(191,219,174)' }}>55 명</td>
                                    <td colSpan={2}></td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width: '95%', borderCollapse: 'collapse' }} className={styles.food}>
                            <tbody>
                                <tr>
                                    <td rowSpan={5} colSpan={3} style={{ borderLeft: 0 }}>
                                        식수 현황
                                    </td>
                                    {new Array(20).fill(null).map((_, i) => (
                                        <td key={i} style={{ textAlign: 'center' }}>
                                            .
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {new Array(20).fill(null).map((_, i) => (
                                        <td key={i} style={{ textAlign: 'center' }}>
                                            {i === 0 && '조'}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {new Array(20).fill(null).map((_, i) => (
                                        <td key={i} style={{ textAlign: 'center' }}>
                                            {i === 0 && '중'}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    {new Array(20).fill(null).map((_, i) => (
                                        <td key={i} style={{ textAlign: 'center' }}>
                                            {i === 0 && '석'}
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td colSpan={2}>계</td>
                                    <td colSpan={6} style={{ borderRight: 0, fontWeight: 'bold' }}>
                                        110식
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            style={{
                                position: 'absolute',
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: 'rgb(253, 19, 249)',
                                top: 360,
                                left: 20,
                            }}
                        >
                            * 식수현황
                        </div>
                        <div style={{ position: 'absolute', top: 380, fontSize: 14, left: 20 }}>
                            식수 인원 변경은{' '}
                            <span style={{ color: 'red', fontWeight: 'bold' }}>( 23.03.31. 10시 ) </span> 이후로는 절대
                            불가하며 예약한 식수인원에 대해 비용을 청구합니다.
                        </div>
                        <div style={{ position: 'absolute', top: 400, fontSize: 14, fontWeight: 'bold', left: 20 }}>
                            이를 확인하고 서명합니다.________________(서멍)
                        </div>
                        <table className={styles.classRoom}>
                            <tbody>
                                <tr>
                                    <td colSpan={2} rowSpan={6} style={{ borderLeft: 0, width: 95 }}>
                                        사용시설
                                    </td>
                                    <td style={{ width: 50 }}>숙소</td>
                                    <td>1박</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>강의실</td>
                                    <td>2일</td>
                                    <td style={{ width: 120 }}> 204호 강의실</td>
                                    <td style={{ width: 50 }}>1일</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={5} rowSpan={1} style={{ fontWeight: 'bold' }}>
                                        * 주의사항 : 유선 랜을 사용할 경우 내부 보안프로그램이 자동 설치됩니다.(
                                        삭제불가 ) 무선 이터넷만 사용하시기 바랍니다.
                                    </td>
                                </tr>
                                <tr>
                                    <td rowSpan={2}>기타</td>
                                    <td>다목적실(A/B)</td>
                                    <td style={{ background: 'rgb(191,219,174)' }}></td>
                                    <td rowSpan={2}>사용시간</td>
                                    <td style={{ background: 'rgb(191,219,174)' }}></td>
                                </tr>
                                <tr>
                                    <td style={{ width: 120 }}>운동장/ 농구/ 족구장</td>
                                    <td></td>
                                    <td style={{}}></td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.money}>
                            <tbody>
                                <tr>
                                    <td rowSpan={3}>임대료 정산</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
