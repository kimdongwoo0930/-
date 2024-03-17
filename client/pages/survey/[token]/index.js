import styles from '@/styles/survey/index.module.css'; // 변경된 파일 경로와 이름
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useAxiosApi from '@/Hooks/AxiosApi';

const SurveyMainPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const { data, errer, loaded, GetAxios } = useAxiosApi();

    const [organization, setOrganization] = useState('');
    const [address, setAddress] = useState('');

    // 첫 화면 시작될때 토큰을 통해 업체명 가져오기

    useEffect(() => {
        const getData = () => {
            if (token) {
                GetAxios(`${process.env.NEXT_PUBLIC_SURVEY_CHECK_TOKEN_API}/${token}`);
            }
        };
        getData();
    }, [token]);

    useEffect(() => {
        if (loaded) {
            if (!data?.expiration) {
                setOrganization(data?.organization);
                setAddress(`/survey/${data?.token}/question`);
            } else {
                window.location.href = '/survey/error';
            }
        }
    }, [loaded, errer, data]);

    return (
        <div className={styles.Main}>
            {' '}
            {/* 변경된 클래스명 */}
            <div className={styles.Header}>
                {' '}
                {/* 변경된 클래스명 */}
                <div>
                    <div className={styles.SmallRectangle}></div> {/* 변경된 클래스명 */}
                    <div className={styles.SmallRectangle}></div> {/* 변경된 클래스명 */}
                </div>
                <div>
                    <div className={styles.BigRectangle}></div> {/* 변경된 클래스명 */}
                </div>
                <div>
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
                <p className={styles.introduce}>
                    저희 흥국생명연수원을 찾아주신 {organization} 고객님께 감사드립니다. <br />
                    <br />
                    고객님께 보다 나은 서비스를 제공해드리기 위해 이용 만족도 조사를 실시하고자 합니다.
                    <br />
                    <br />
                    고객님의 소중한 의견을 통해 더욱 발전하는 흥국 생명 연수원이 되도록 하겠습니다.
                </p>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div className={styles.start}>
                        {' '}
                        {/* 변경된 클래스명 */}
                        <Link
                            href={address}
                            style={{
                                color: 'white',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                            }}
                        >
                            설문 시작
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyMainPage;
