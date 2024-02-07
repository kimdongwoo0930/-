import React, { useEffect, useState } from 'react';

import '@/styles/survey/question.css';

import AnswerInput from './AnswerInput';

const QuestionBox = ({
    page,
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
                {idx + 1}. {items?.question}
            </div>
            <div className="input-container">
                {items?.answer.map((item, num) => (
                    <div className="input-wrapper" key={num}>
                        <input
                            type="checkbox"
                            checked={checkNum[idx] === num}
                            onChange={() => {
                                updateCheckNum(idx, num);
                            }}
                        />
                        <div
                            onClick={() => {
                                updateCheckNum(idx, num);
                            }}
                        >
                            {item}
                        </div>
                    </div>
                ))}
            </div>

            <div className="answer-container">
                <AnswerInput
                    idx={idx}
                    setAnswer={updateWriteAnswer}
                    Answer={writeAnswer}
                    checkNum={checkNum}
                    items={items}
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
