import { useEffect, useState } from 'react';
import '../../styles/survey/make-url.css';

import useAxiosApi from '@/Hooks/AxiosApi';

const MakeUrlpage = () => {
    const [name, setName] = useState('');
    const [Url, setUrl] = useState('');
    const [message, setMessage] = useState('');
    const { data, errer, loaded, GetAxios } = useAxiosApi();

    const handleGenerate = async () => {
        if (name.trim() === '') {
            setUrl('업체명을 입력해주세요.');
        } else {
            await GetAxios(`${process.env.NEXT_PUBLIC_SURVEY_GENERATE_TOKEN_API}/${name}`);
        }
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 메세지가 복사되었습니다.');
        } catch (e) {
            alert('복사에 실패하였습니다');
        }
    };

    useEffect(() => {
        if (loaded) {
            const url = `https://www.hka.kr/survey/${data?.token}`;
            const Message = `
흥국생명 용인 연수원 이용고객 만족도 설문조사
            
저희 흥국생명 용인연수원을 이용하여 주셔서 감사를 드립니다. 이용고객의 의견 및 소리를경청하여 보다 나은 고객 만족 실현과 서비스 제공을 목표로 이용고객에 대한 설문 조사를 실시하여 자료로 활용하고자 합니다. 본 설문 조사 내용은 이용고객 지원을 위한 분석 자료로만 활용하며 작성 내용에 따른 어떤 불이익도 없음으로 평소 생각하신 대로 솔직한 느낌과 의견으로 작성하여 주시기 바랍니다.
    
● 설문 참여하러가기 ●
${url} `;

            setMessage(Message);
            setUrl(url);
            handleCopyClipBoard(Message);
        }
    }, [loaded]);
    return (
        <>
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
                    <p className="introduce">설문조사 토큰을 생성합니다.</p>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            style={{
                                width: '70%',
                                height: 40,
                                borderTop: 0,
                                borderLeft: 0,
                                borderRight: 0,
                            }}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder={'업체명을 입력해주세요.'}
                        />
                    </div>
                    <button className="submit-button" onClick={handleGenerate}>
                        생성
                    </button>
                    <div style={{ width: '90%', paddingTop: 40 }}>
                        <p style={{ width: '100%', wordWrap: 'break-word' }}>
                            흥국생명 용인 연수원 이용고객 만족도 설문조사 <br />
                            <br />
                            저희 흥국생명 용인연수원을 이용하여 주셔서 감사를 드립니다. 이용고객의 의견 및 소리를
                            경청하여 보다 나은 고객 만족 실현과 서비스 제공을 목표로 이용고객에 대한 설문 조사를
                            실시하여 자료로 활용하고자 합니다. 본 설문 조사 내용은 이용고객 지원을 위한 분석 자료로만
                            활용하며 작성 내용에 따른 어떤 불이익도 없음으로 평소 생각하신 대로 솔직한 느낌과 의견으로
                            작성하여 주시기 바랍니다. <br />
                            <br />
                            ● 설문 참여하러가기 ●<br />
                            {Url}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MakeUrlpage;
