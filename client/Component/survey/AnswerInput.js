import '@/styles/survey/question.css';
import { useEffect, useState } from 'react';

const AnswerInput = ({ page, idx, setAnswer, Answer, checkNum, items }) => {
    const [disableAnswer, setDisableAnswer] = useState();

    useEffect(() => {
        UpdateDisableAnswer();
    }, [checkNum]);

    const UpdateDisableAnswer = () => {
        if (
            checkNum[idx] === items?.answer.length - 1 ||
            (idx >= 4 &&
                idx < 10 &&
                (checkNum[idx] === items?.answer.length - 1 || checkNum[idx] === items?.answer.length - 2)) ||
            idx === 10
        ) {
            setDisableAnswer(false);
        } else {
            setDisableAnswer(true);
        }
    };

    return (
        <input
            className={'answer-input'}
            type="text"
            placeholder={
                idx < 4
                    ? '기타사항을 적어주세요.'
                    : idx === 10
                    ? '느낀 점을 작성해 주세요.'
                    : '불만족 사항을 작성해주세요.'
            }
            disabled={disableAnswer}
            value={Answer[idx] || ''}
            onChange={(e) => setAnswer(idx, e.target.value)}
        />
    );
};

export default AnswerInput;
