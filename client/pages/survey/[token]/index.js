/*
    설문조사 시작 페이지
*/

import { useRouter } from 'next/router';
import '../../../styles/survey/index.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import useAxiosApi from '@/Hooks/AxiosApi';

const SurveyMainPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const { data, errer, loaded, GetAxios } = useAxiosApi();

    const [organization, setOrganization] = useState('');
    const [address, setAdress] = useState('');

    // 첫 화면 시작될때 토큰을 통해 업체명 가져오기

    useEffect(() => {
        const getData = async () => {
            if (token) {
                await GetAxios(`http://localhost:8001/api/v1/check-token/${token}`);
            }
        };
        getData();
    }, [token]);

    useEffect(() => {
        if (loaded) {
            if (!data?.expiration) {
                setOrganization(data?.organization);
                setAdress(`/survey/${data?.token}/question`);
            } else {
                window.location.href = '/survey/error';
            }
        }
    }, [loaded]);

    return (
        <div className="Main">
            <div className="Header">
                <div>
                    <div className="SmallRectangle"></div>
                    <div className="SmallRectangle"></div>
                </div>
                <div>
                    <div className="BigRectangle"></div>
                </div>
                <div>
                    <p className="LogoTitle">Heungkuk</p>
                    <p className="LogoDescription">Life Insurance</p>
                </div>
            </div>
            <br />

            <div className="Title">
                <p>흥국생명연수원 이용 만족도 조사</p>
            </div>
            <div className="Body">
                <p className="introduce">
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
                    <div className="start">
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
