import React, { useEffect, useState } from 'react';
import styles from '@/styles/admin/Home/Home.module.css';
import { GetWeather } from '@/Api/Home/GetApi';
import { WeatherLoading } from '@/Component/Loading/Loading';

const weather = () => {
    const [loading, setLoading] = useState(true);
    // 번역본
    const KR = {
        201: '가벼운 비를 동반한 천둥구름',
        200: '비를 동반한 천둥구름',
        202: '폭우를 동반한 천둥구름',
        210: '약한 천둥구름',
        211: '천둥구름',
        212: '강한 천둥구름',
        221: '불규칙적 천둥구름',
        230: '약한 연무를 동반한 천둥구름',
        231: '연무를 동반한 천둥구름',
        232: '강한 안개비를 동반한 천둥구름',
        300: '가벼운 안개비',
        301: '안개비',
        302: '강한 안개비',
        310: '가벼운 적은비',
        311: '적은비',
        312: '강한 적은비',
        313: '소나기와 안개비',
        314: '강한 소나기와 안개비',
        321: '소나기',
        500: '악한 비',
        501: '중간 비',
        502: '강한 비',
        503: '매우 강한 비',
        504: '극심한 비',
        511: '우박',
        520: '약한 소나기 비',
        521: '소나기 비',
        522: '강한 소나기 비',
        531: '불규칙적 소나기 비',
        600: '가벼운 눈',
        601: '눈',
        602: '강한 눈',
        611: '진눈깨비',
        612: '소나기 진눈깨비',
        615: '약한 비와 눈',
        616: '비와 눈',
        620: '약한 소나기 눈',
        621: '소나기 눈',
        622: '강한 소나기 눈',
        701: '박무',
        711: '연기',
        721: '연무',
        731: '모래 먼지',
        741: '안개',
        751: '모래',
        761: '먼지',
        762: '화산재',
        771: '돌풍',
        781: '토네이도',
        800: '구름 한 점 없는 맑은 하늘',
        801: '약간의 구름이 낀 하늘',
        802: '드문드문 구름이 낀 하늘',
        803: '구름이 거의 없는 하늘',
        804: '구름으로 뒤덮인 흐린 하늘',
        900: '토네이도',
        901: '태풍',
        902: '허리케인',
        903: '한랭',
        904: '고온',
        905: '바람부는 날씨',
        906: '우박',
        951: '바람이 거의 없는 날씨',
        952: '약한 바람',
        953: '부드러운 바람',
        954: '중간 세기 바람',
        955: '신선한 바람',
        956: '센 바람',
        957: '돌풍에 가까운 센 바람',
        958: '돌풍',
        959: '심각한 돌풍',
        960: '폭풍',
        961: '강한 폭풍',
        962: '허리케인',
    };

    const [weatherData, setWeatherData] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);

    const [Today, setToday] = useState(new Date().getDate());

    useEffect(() => {
        const currentTime = new Date();

        // 가장 가까운 이전 시간 계산 (예를 들어, 3시간마다 업데이트된다고 가정)
        const nearestHour = Math.floor(currentTime.getHours() / 3) * 3; // 현재 시간의 시간대 중에서 3으로 나눈 나머지를 구하여 3으로 나누어떨어지는 최근 시간을 찾음
        console.log(nearestHour);
        setCurrentTime(nearestHour === 21 ? 0 : nearestHour + 3); // 21시 이후에는 0시로 표시되도록 설정
    }, [currentTime]);

    /**
     * 날씨 데이터 가져오기
     */
    useEffect(() => {
        const getWeather = async () => {
            const response = await GetWeather();
            if (response.cod === '200') {
                console.log(response);
                setWeatherData(response.list);
            }
            setLoading(false);
        };
        getWeather();
    }, []);

    return (
        <div className={styles.WeatherContainer}>
            <div>연수원 날씨 ({currentTime}시 기준)</div>
            {loading && <WeatherLoading />}
            {/* 일주일치를 가져오는게 좋겠지 */}
            {/* 일 월 화 수 목 금 토 */}
            {/* 이렇게 가져와서 오늘 날짜인걸 표시를 하자 */}
            <div>
                {!loading &&
                    weatherData &&
                    weatherData.map((data, index) => {
                        // 현재하고 제일 가까운 시간을 가져와야 한다. 24시간 기준으로
                        const text_time = data.dt_txt.split(' ')[1].split(':')[0];

                        if (parseInt(text_time) === currentTime) {
                            const date = new Date(data.dt_txt).toString();

                            return (
                                <div className={styles.Card}>
                                    <div className={styles.weatherCard}>
                                        <div className={styles.weatherDate}>
                                            {Today === parseInt(date.split(' ')[2]) ? 'Today' : date.split(' ')[2]}
                                        </div>
                                        <div className={styles.weatherIcon}>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
                                                alt="날씨 아이콘"
                                            />
                                        </div>
                                        <div className={styles.weatherTemp}>
                                            <div className={styles.weatherTempBox}>
                                                <span>현재 온도</span>
                                                <div className={styles.weatherTemp}>{data.main.temp}°C</div>
                                            </div>
                                            <div className={styles.weatherTempBox}>
                                                <span>체감 온도</span>
                                                <div className={styles.weatherTemp}>{data.main.feels_like}°C</div>
                                            </div>
                                        </div>
                                        <div className={styles.weatherDescription}>{KR[data.weather[0].id]}</div>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default weather;
