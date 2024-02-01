import React from 'react';

import '@/styles/survey/question.css';

const QuestionBox = ({
    idx,
    currentQuestion,
    questionRef,
    items,
    checkNum,
    updateCheckNum,
    writeAnswer,
    updateWriteAnswer,
    handlePrevQuestion,
    handleNextQuestion,
    sendToServer,
}) => {
    return (
        <div key={idx} className={`question-box`} ref={questionRef.current[idx]}>
            <div className="question-title">
                {idx + 1}. {items.question}
            </div>
            <div className="input-container">
                {items.answer.map((item, num) => (
                    <div className="input-wrapper" key={num}>
                        <input
                            type="checkbox"
                            checked={checkNum[idx] === num}
                            onChange={() => updateCheckNum(idx, num)}
                        />
                        <div onClick={() => updateCheckNum(idx, num)}>{item}</div>
                    </div>
                ))}
            </div>
            <div className="answer-container">
                <input
                    className="answer-input"
                    type="text"
                    placeholder="기타사항을 적어주세요."
                    value={writeAnswer[idx] || ''}
                    onChange={(e) => updateWriteAnswer(idx, e.target.value)}
                />
            </div>
            <div className="box-button-container">
                {idx !== 10 ? (
                    <>
                        <button className="box-button" onClick={handlePrevQuestion}>
                            뒤로
                        </button>
                        <button className="box-button" onClick={handleNextQuestion}>
                            다음
                        </button>
                    </>
                ) : (
                    <>
                        <button className="box-button" onClick={handlePrevQuestion}>
                            뒤로
                        </button>
                        <button className="box-button" onClick={sendToServer}>
                            제출
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestionBox;
