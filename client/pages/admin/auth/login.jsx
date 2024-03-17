import styles from '@/styles/admin/login.module.css';
import { useEffect, useState } from 'react';
import useAxiosPost from '@/Hooks/admin/PostApi';
import { signUp, login } from '@/Api/auth/PostApi';
import { CSSTransition } from 'react-transition-group';
import sleep from '@/Utils/sleep';

const LoginPage = () => {
    //회원가입
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인 화면 만들어보자 한번 진짜
    const [register, setRegister] = useState(false);
    const [loginState, setLogin] = useState(true);

    /**
     * 화면 시작될때 토큰을 제거해야한다
     */
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    /**
     * 로그인 및 회원가입 함수
     */
    const submitHandler = async () => {
        // 회원가입
        if (register) {
            if (!id || !password || !name) {
                alert('아이디와 비밀번호, 이름을 입력해주세요.');
                return;
            }
            if (password.trim().length < 8) {
                alert('비밀번호는 8자 이상이어야 합니다.');
                return;
            }
            const response = await signUp(name, id, password);
            console.log(response);
            if (response.status === 'BAD_REQUEST') {
                alert('이미 존재하는 아이디입니다.');
                return;
            } else if (response.status === 'OK') {
                alert('접속 권한을 부여받으면 접속이 가능합니다.');
                window.location.reload();
            }
        }
        // 로그인
        else {
            if (!id || !password) {
                alert('아이디와 비밀번호를 입력해주세요.');
                return;
            }
            const response = await login(id, password);
            if (response.status === '404') {
                alert('아이디 또는 비밀번호를 확인해주세요.');
            } else if (response.status === '401') {
                alert('권한을 부여받지 못했습니다.');
            } else if (response.status === '200') {
                window.location.href = '/admin/home';
                // 토큰 저장해야함
            }
        }
    };

    const switchToLogin = () => {
        setLogin(true);
        setRegister(false);
    };

    const switchToRegister = () => {
        setLogin(false);
        setRegister(true);
    };

    // 엔터 눌렀을 경우
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandler();
        }
    };

    return (
        <>
            <div className={styles.Main}>
                <div className={styles.Header}>
                    <div>
                        <div className={styles.SmallRectangle}></div>
                        <div className={styles.SmallRectangle}></div>
                    </div>
                    <div>
                        <div className={styles.BigRectangle}></div>
                    </div>
                    <div>
                        <p className={styles.LogoTitle}>Heungkuk</p>
                        <p className={styles.LogoDescription}>예약 관리 페이지</p>
                    </div>
                </div>
                <div className={styles.Body}>
                    <div className={styles.Wrapper}>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    register ? switchToLogin() : switchToRegister();
                                }}
                                checked={register}
                            />
                            <span className={styles.slider}></span>
                        </label>
                        <CSSTransition
                            in={register}
                            timeout={{
                                enter: 1000,
                            }}
                            mountOnEnter
                            unmountOnExit
                            classNames={{
                                enter: styles.rotateLeft,
                            }}
                        >
                            <div className={styles.register_box}>
                                <div className={styles.coolinput}>
                                    <label for="input" className={styles.text}>
                                        이름
                                    </label>
                                    <input
                                        type="text"
                                        name="input"
                                        className={styles.input}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.coolinput}>
                                    <label for="input" className={styles.text}>
                                        아이디
                                    </label>
                                    <input
                                        type="text"
                                        name="input"
                                        className={styles.input}
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>
                                <div className={styles.coolinput}>
                                    <label for="input" className={styles.text}>
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        name="input"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className={styles.submit} type="submit" onClick={() => submitHandler()}>
                                    접속
                                </button>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={loginState}
                            timeout={{
                                enter: 1000,
                            }}
                            mountOnEnter
                            unmountOnExit
                            classNames={{
                                enter: styles.rotateLeft,
                            }}
                            onKeyDown={handleOnKeyPress}
                        >
                            <div className={styles.login_box}>
                                <div className={styles.coolinput}>
                                    <label for="input" className={styles.text}>
                                        아이디
                                    </label>
                                    <input
                                        type="text"
                                        name="input"
                                        className={styles.input}
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>
                                <div className={styles.coolinput}>
                                    <label for="input" className={styles.text}>
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        name="input"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => handleOnKeyPress(e)}
                                    />
                                </div>
                                <button className={styles.submit} type="submit" onClick={() => submitHandler()}>
                                    접속
                                </button>
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
