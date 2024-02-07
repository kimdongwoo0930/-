import '@/styles/survey/question.css';

import datas from '@/public/survey/data.js';

import { useRef, useEffect, useState, createRef } from 'react';
import { useRouter } from 'next/router';

import useAxiosApi from '@/Hooks/AxiosApi';

import QuestionBox from '@/Component/survey/question-box';

const QuestionPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const Data = datas?.questions;

    // 0번은 토큰 / 1 ~ 11 번까지 체크 번호에 있는거 + 기타사항
    const [checkNum, setCheckNum] = useState([]);
    const [writeAnswer, setWriteAnswer] = useState([]);
    const { data, error, loaded, PostAxios } = useAxiosApi();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const questionRef = useRef(Data.map(() => createRef()));
    // 페이지 개선 스테이트
    const [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        if (loaded) {
            if (data?.expiration) {
                router.replace('/survey/end');
            }
        }
    }, [loaded]);

    useEffect(() => {
        // checkNum이 변경될 때마다 scrollIntoView 호출
        if (currentQuestion >= 0 && currentQuestion < 11) {
            questionRef.current[currentQuestion]?.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [currentQuestion]);

    const handleNextQuestion = () => {
        if (currentQuestion <= 10 && checkNum[currentQuestion] !== undefined) {
            setCurrentQuestion(currentQuestion + 1);
            setPageNum(pageNum + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setPageNum(pageNum - 1);
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const updateCheckNum = (index, newValue) => {
        const List = [...checkNum];

        List[index] = newValue;

        setCheckNum(List);
    };

    const updateWriteAnswer = (index, value) => {
        const List = [...writeAnswer];

        List[index] = value;

        setWriteAnswer(List);
    };

    const sendToserver = () => {
        const payload = {
            token: token,
            answer_1: `${Data[0].answer[checkNum[0]]}/${writeAnswer[0] || ''}`,
            answer_2: `${Data[1].answer[checkNum[1]]}/${writeAnswer[1] || ''}`,
            answer_3: `${Data[2].answer[checkNum[2]]}/${writeAnswer[2] || ''}`,
            answer_4: `${Data[3].answer[checkNum[3]]}/${writeAnswer[3] || ''}`,
            answer_5: `${Data[4].answer[checkNum[4]]}/${writeAnswer[4] || ''}`,
            answer_6: `${Data[5].answer[checkNum[5]]}/${writeAnswer[5] || ''}`,
            answer_7: `${Data[6].answer[checkNum[6]]}/${writeAnswer[6] || ''}`,
            answer_8: `${Data[7].answer[checkNum[7]]}/${writeAnswer[7] || ''}`,
            answer_9: `${Data[8].answer[checkNum[8]]}/${writeAnswer[8] || ''}`,
            answer_10: `${Data[9].answer[checkNum[9]]}/${writeAnswer[9] || ''}`,
            answer_11: `null/${writeAnswer[10] || ''}`,
        };
        const url = process.env.NEXT_PUBLIC_SURVEY_API_URL;
        PostAxios(url, payload);
    };

    return (
        <>
            <div className="Main">
                <div className="Header">
                    <div style={{}}>
                        <div className="SmallRectangle"></div>
                        <div className="SmallRectangle"></div>
                    </div>
                    <div style={{}}>
                        <div className="BigRectangle"></div>
                    </div>
                    <div style={{}}>
                        <p className="LogoTitle">Heungkuk</p>
                        <p className="LogoDescription">Life Insurance</p>
                    </div>
                </div>
                <br />
                <div className="Body">
                    <QuestionBox
                        page={pageNum}
                        idx={pageNum}
                        currentQuestion={currentQuestion}
                        questionRef={questionRef}
                        items={Data[pageNum]}
                        checkNum={checkNum}
                        updateCheckNum={updateCheckNum}
                        writeAnswer={writeAnswer}
                        updateWriteAnswer={updateWriteAnswer}
                        handlePrevQuestion={handlePrevQuestion}
                        handleNextQuestion={handleNextQuestion}
                        sendToServer={sendToserver}
                        setPageNum={setPageNum}
                    />

                    {/* {Data.map((item, idx) => (
                        <QuestionBox
                            key={idx}
                            idx={idx}
                            currentQuestion={currentQuestion}
                            questionRef={questionRef}
                            items={item}
                            checkNum={checkNum}
                            updateCheckNum={updateCheckNum}
                            writeAnswer={writeAnswer}
                            updateWriteAnswer={updateWriteAnswer}
                            handlePrevQuestion={handlePrevQuestion}
                            handleNextQuestion={handleNextQuestion}
                            sendToServer={sendToserver}
                        />
                    ))} */}
                </div>
            </div>
        </>
    );
};

export default QuestionPage;
