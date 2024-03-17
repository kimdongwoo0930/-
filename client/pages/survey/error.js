import styles from '../../styles/survey/end.module.css'; // 변경된 파일 경로와 이름

const Errorpage = () => {
    return (
        <>
            <div className={styles.Main}>
                {' '}
                {/* 변경된 클래스명 */}
                <div className={styles.Header}>
                    {' '}
                    {/* 변경된 클래스명 */}
                    <div style={{}}>
                        <div className={styles.SmallRectangle}></div> {/* 변경된 클래스명 */}
                        <div className={styles.SmallRectangle}></div> {/* 변경된 클래스명 */}
                    </div>
                    <div style={{}}>
                        <div className={styles.BigRectangle}></div> {/* 변경된 클래스명 */}
                    </div>
                    <div style={{}}>
                        <p className={styles.LogoTitle}>Heungkuk</p> {/* 변경된 클래스명 */}
                        <p className={styles.LogoDescription}>Life Insurance</p> {/* 변경된 클래스명 */}
                    </div>
                </div>
                <br />
                <div className={styles.Title}>
                    {' '}
                    {/* 변경된 클래스명 */}
                    <p>흥국생명연수원 이용 만족도 조사</p>
                </div>
                <div className={styles.Body}>
                    {' '}
                    {/* 변경된 클래스명 */}
                    <p className={styles.introduce}>주소가 만료되었거나 잘못되었습니다.</p> {/* 변경된 클래스명 */}
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default Errorpage;
