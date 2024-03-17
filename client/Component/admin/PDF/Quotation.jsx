import React, { useRef } from 'react';
import styles from '@/styles/admin/Pdf/Quotation.module.css';
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';

const Quotation = () => {
    const quotationRef = useRef(null);

    const saveAsPdf = () => {
        const quotation = quotationRef.current;

        html2canvas(quotation).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('quotation.pdf');
        });
    };

    return (
        <>
            <button onClick={() => saveAsPdf()}>Test</button>
            <div className={styles.root} ref={quotationRef}>
                <div className={styles.Title}>
                    <div className={styles.Logo}>
                        {/* <div>
                        <div>
                            <div className={styles.SmallRectangle}></div>
                            <div className={styles.SmallRectangle}></div>
                        </div>
                        <div>
                            <div className={styles.BigRectangle}></div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.LogoText}>Heungkuk</div>
                        <div className={styles.LogoSubText}>Life Insurance</div>
                    </div> */}
                        <img src="https://www.heungkuklife.co.kr/hk_web/img/common/logo.gif"></img>
                    </div>
                    <div className={styles.TitleText}>견 적 서</div>
                </div>
                {/* 업체명 */}
                <div className={styles.CompanyName}>
                    <div className={styles.CompanyNameTitle}>흥국생명</div>
                    <div className={styles.CompanyNameContent}>귀중</div>
                </div>
                <div className={styles.TrashText1}>아래와 같이 견적합니다.</div>
                <div className={styles.host}>
                    <table border={2}>
                        <tbody>
                            <tr>
                                <td rowSpan={4}>공급자</td>
                                <td>등록번호</td>
                                <td>135 - 85 - 03824</td>
                            </tr>
                            <tr>
                                <td>상호</td>
                                <td>흥국생명보험(주) 연수원</td>
                            </tr>
                            <tr>
                                <td>대표</td>
                                <td>임형준</td>
                            </tr>
                            <tr>
                                <td>사업장소재지</td>
                                <td>경기도 용인시 기흥구 중부대로819번길 57-9</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.subHost}>
                    <div>&#62; 담 당 자 : 오 세 도 소장</div>
                    <div>&#62; 연 락 처 : T. 031-283-6157(직통) / 031-284-5323 </div>
                    <div>&#62; 이메일 : hksd5@naver.com</div>
                    <div>&#62; 홈페이지 : http://www.heungkukacademy.co.kr</div>
                </div>
                {/* 견적 */}
                <div className={styles.TrashText2}>&#62; 견적 내용: </div>
                <table border={2} className={styles.organizationIntroduce}>
                    <tbody>
                        <tr>
                            <td>업체 명</td>
                            <td colSpan={2}>흥국 생명</td>
                        </tr>
                        <tr>
                            <td>교육 명칭</td>
                            <td colSpan={2}>수학여행</td>
                        </tr>
                        <tr>
                            <td>사용 기간</td>
                            <td>2024년 05월 09일 (목) ~ 2024년 05월 10일 (금)</td>
                            <td>1박 2일</td>
                        </tr>
                    </tbody>
                </table>
                {/* 자세한 견적 */}
                <table className={styles.detail} border={2}>
                    <thead>
                        <tr>
                            <td colSpan={2}>품목</td>
                            <td>규격</td>
                            <td>수량</td>
                            <td>단가</td>
                            <td>공급가액</td>
                            <td>세액</td>
                            <td>합계</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                숙박비
                            </td>
                            <td style={{ textAlign: 'center' }}>4인 침대</td>
                            <td>1 박</td>
                            <td>16 실</td>
                            <td>85,000</td>
                            <td>1,360,000</td>
                            <td>136,000</td>
                            <td>1,496,000</td>
                        </tr>
                        <tr>
                            <td>2인 침대</td>
                            <td>1 박</td>
                            <td>5 실</td>
                            <td>85,000</td>
                            <td>425,000</td>
                            <td>42,500</td>
                            <td>467,500</td>
                        </tr>
                        <tr>
                            <td>1인 침대</td>
                            <td> 박</td>
                            <td> 실</td>
                            <td>85,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td rowSpan={7} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                강의실비
                            </td>
                            <td style={{ textAlign: 'center' }}>대형 (120인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>1,200,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>중형 (70인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>560,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>중형 (50인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>400,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>소형 (30인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>240,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>소형 (20인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>160,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>분임실 (12인)</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>96,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>

                        <tr>
                            <td>다목적실</td>
                            <td> 일</td>
                            <td> 실</td>
                            <td>250,000</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td colSpan={5} rowSpan={2} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                시설 계
                            </td>
                            <td rowSpan={2} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                1,785,000
                            </td>
                            <td rowSpan={2} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                178,500
                            </td>
                            <td rowSpan={2} style={{ backgroundColor: 'rgb(252, 230, 213)' }}>
                                1,963,500
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* 식수 */}
                <table className={styles.food} border={2}>
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: 'rgb(252, 230, 213)', textAlign: 'center' }}>식비</td>
                            <td style={{ textAlign: 'center' }}>일반식</td>
                            <td>-</td>
                            <td>67 식</td>
                            <td>8,300</td>
                            <td>556,100</td>
                            <td>55,610</td>
                            <td>611,710</td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ backgroundColor: 'rgb(252, 230, 213)', textAlign: 'center' }}>
                                식비 계
                            </td>
                            <td style={{ backgroundColor: 'rgb(252, 230, 213)' }}>556,100</td>
                            <td style={{ backgroundColor: 'rgb(252, 230, 213)' }}>55,610</td>
                            <td style={{ backgroundColor: 'rgb(252, 230, 213)' }}>611,710</td>
                        </tr>
                    </tbody>
                </table>
                <table
                    border={2}
                    color="gray"
                    style={{
                        borderCollapse: 'collapse',
                        background: 'lightyellow',
                        width: 693,
                        height: 35,
                        position: 'absolute',
                        top: 720,
                        fontWeight: 'bold',
                        textAlign: 'right',
                    }}
                >
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>시설 + 식비 계</td>
                            <td style={{ paddingRight: 10 }}>2,341,100</td>
                            <td style={{ paddingRight: 10 }}>234,110</td>
                            <td style={{ paddingRight: 10 }}>2,575,210</td>
                        </tr>
                    </tbody>
                </table>

                {/* 식수 현황 */}
                <table className={styles.foodDetail} border={2}>
                    <thead>
                        <tr>
                            <td>구분</td>
                            <td>9 일</td>
                            <td>10 일</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={2}>식수계</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>조식</td>
                            <td></td>
                            <td>67</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={2}>67</td>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={2}>0</td>
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colSpan={2}>0</td>
                        </tr>
                        <tr>
                            <td>소계</td>
                            <td>0</td>
                            <td>67</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td colSpan={2}>67</td>
                        </tr>
                    </tbody>
                </table>
                {/* 시설 유의사항 */}
                <div className={styles.TrashText3}>
                    ★ 대관격적서 이메일 전송 후 연수원 시설 사용 여부를 15일 이내 이메일로 재전송 부탁드립니다.
                </div>
                <div className={styles.TrashText4}>
                    (대관계약서는 별도로 없고 대관확인서 작성 후 서명 및 도장날인이 완료되면 예약완료됩니다)
                </div>
                <div className={styles.TrashText5}>&#62; 시설 이용시 유의사항</div>
                <div className={styles.InfoBox}>
                    <div className={styles.Info1}>▹ 특식은 별도 예약 바랍니다.( 070 - 8915 - 0872 장지원 점장 )</div>
                    <div className={styles.Info2}>
                        ** 식당 운영 시간 : 조식(07:30~08:30), 중식(12:00~13:00), 석식(18:00~19:00)
                    </div>
                    <div className={styles.Info3}>
                        ** 식사는 예약제로 운영되기때문에 신청 인원에서 변동이 있을 경우 입소 3일전 오전 10시까지 확정
                        통보하여 주시기 바랍니다. <br />
                        (통보가 없을 시 신청인원으로 청구되며, 인원초과시는 초과 인원으로 정산되고 식권이 남는경우
                        비용이 반환 되지않습니다.)
                    </div>
                    <div className={styles.Info4}>
                        ** 시설(강의실,숙박)과 식당의 사업자가 달라 결제가 별도로 진행되는 점 참고하여 주시기 바랍니다.
                    </div>
                    <div className={styles.Info5}>
                        ** 예약하지 않고는 식사가 불가 합니다.( ex. 중식만 예약시, 예약하지 않은 석식 및 조식등 식사
                        불가 )
                    </div>
                    <div className={styles.Info6}>▹ 기타</div>
                    <div className={styles.Info7}>** 생활관(숙소) : 입실(13시) / 퇴실(09:30)</div>
                    <div className={styles.Info8}>** 연수원내 바베큐 행사 및 취사 불가</div>
                    <div className={styles.Info9}>** 퇴소일이 주말, 공휴일일 경우 전일 정산합니다</div>
                </div>
            </div>
        </>
    );
};

export default Quotation;
