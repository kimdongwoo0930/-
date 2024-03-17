<div className={styles.SchedulerContainer}>
    <div className={styles.SchedulerWrapper}>
        {/* 그 달의 날짜를 표시 */}
        <div className={styles.SchedulerDate}>
            <div style={{ width: 100, border: '1px solid black' }}></div>
            {
                // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                Array.from({ length: 31 }, (_, index) => {
                    const date = index + 1;
                    return (
                        <div className={styles.DateBox} key={index}>
                            {date}
                        </div>
                    );
                })
            }
        </div>
        {/* 강의실표시 부터 */}
        <div className={styles.ClassWrapper}>
            <div className={styles.ClassName}>대</div>
            <div className={styles.ClassBoxWrapper}>
                <div className={styles.ClassLine}>
                    <div className={styles.ClassNumber}>105</div>
                    {
                        // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                        // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                        Array.from({ length: 31 }, (_, index) => {
                            const date = index + 1;
                            return <div className={styles.ClassBox} key={index}></div>;
                        })
                    }
                </div>
                <div className={styles.ClassLine}>
                    <div className={styles.ClassNumber}>106</div>
                    {
                        // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                        // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                        Array.from({ length: 31 }, (_, index) => {
                            const date = index + 1;
                            return <div className={styles.ClassBox} key={index}></div>;
                        })
                    }
                </div>
            </div>
        </div>
        <div className={styles.ClassWrapper}>
            <div className={styles.ClassName}>중</div>
            <div className={styles.ClassBoxWrapper}>
                <div className={styles.ClassLine}>
                    <div className={styles.ClassNumber}>201</div>
                    {
                        // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                        // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                        Array.from({ length: 31 }, (_, index) => {
                            const date = index + 1;
                            return <div className={styles.ClassBox} key={index}></div>;
                        })
                    }
                </div>
                <div className={styles.ClassLine}>
                    <div className={styles.ClassNumber}>203</div>
                    {
                        // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                        // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                        Array.from({ length: 31 }, (_, index) => {
                            const date = index + 1;
                            return <div className={styles.ClassBox} key={index}></div>;
                        })
                    }
                </div>
                <div className={styles.ClassLine}>
                    <div className={styles.ClassNumber}>204</div>
                    {
                        // 1부터 31까지 반복문을 만들어줘 map함수로 반복문을 돌린다.
                        // TODO : 실제로는 해당 월의 마지막 날짜를 구해서 반복문을 돌려야 한다.
                        Array.from({ length: 31 }, (_, index) => {
                            const date = index + 1;
                            return <div className={styles.ClassBox} key={index}></div>;
                        })
                    }
                </div>
            </div>
        </div>
    </div>
</div>;
