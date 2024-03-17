import React, { useEffect, useState } from 'react';

import styles from '@/styles/survey/question.module.css'; // 변경된 파일 경로와 이름
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
        <div key={idx} className={styles.questionBox}>
            {' '}
            {/* 변경된 클래스명 */}
            <div className={styles.questionTitle}>
                {' '}
                {/* 변경된 클래스명 */}
                {idx + 1}. {items?.question}
            </div>
            <div className={styles.inputContainer}>
                {' '}
                {/* 변경된 클래스명 */}
                {items?.answer.map((item, num) => (
                    <div className={styles.inputWrapper} key={num}>
                        {' '}
                        {/* 변경된 클래스명 */}
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
            <div className={styles.answerContainer}>
                {' '}
                {/* 변경된 클래스명 */}
                <AnswerInput
                    idx={idx}
                    setAnswer={updateWriteAnswer}
                    Answer={writeAnswer}
                    checkNum={checkNum}
                    items={items}
                />
            </div>
            <div className={styles.boxButtonContainer}>
                {' '}
                {/* 변경된 클래스명 */}
                {idx !== 10 ? (
                    <>
                        <button className={styles.boxButton} onClick={handlePrevQuestion}>
                            {' '}
                            {/* 변경된 클래스명 */}
                            뒤로
                        </button>
                        <button className={styles.boxButton} onClick={handleNextQuestion}>
                            {' '}
                            {/* 변경된 클래스명 */}
                            다음
                        </button>
                    </>
                ) : (
                    <>
                        <button className={styles.boxButton} onClick={handlePrevQuestion}>
                            {' '}
                            {/* 변경된 클래스명 */}
                            뒤로
                        </button>
                        <button className={styles.boxButton} onClick={sendToServer}>
                            {' '}
                            {/* 변경된 클래스명 */}
                            제출
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuestionBox;
