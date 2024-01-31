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
        <div
            key={idx}
            className={`question-box ${idx === currentQuestion ? 'show' : ''}`}
            ref={questionRef.current[idx]}
        >
            <div className="question-title">{items.question}</div>
            <div className="input-container">
                {items.answer.map((item, num) => (
                    <div className="input-wrapper" key={num}>
                        <input
                            type="checkbox"
                            checked={checkNum[idx] === num}
                            onChange={() => updateCheckNum(idx, num)}
                        />
                        <label
                            htmlFor={`checkbox-${num}`}
                            style={{ fontSize: 'medium' }}
                            onClick={() => updateCheckNum(idx, num)}
                        >
                            {item}
                        </label>
                    </div>
                ))}
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40,
                }}
            >
                <input
                    className="answer-input"
                    type="text"
                    placeholder="기타사항을 적어주세요."
                    value={writeAnswer[idx] || ''}
                    onChange={(e) => updateWriteAnswer(idx, e.target.value)}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 20,
                }}
            >
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
