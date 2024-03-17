import SideBar from '@/Component/Menu/SideBar';
import { useEffect } from 'react';
import { checkToken } from '@/Api/auth/GetApi';
import Weather from '@/Component/admin/Home/Weather';
import styles from '@/styles/admin/Home/Home.module.css';
import Profile from '@/Component/admin/Home/Profile';
import Visitor from '@/Component/admin/Home/Visitor';

const home = () => {
    useEffect(() => {
        const CheckAccess = async () => {
            // 토큰 존재 여부
            if (!localStorage.getItem('token')) {
                window.location.href = 'auth/login';
                return;
            }
            const response = await checkToken();
            if (response !== 200) {
                window.location.href = 'auth/login';
            }
        };
        CheckAccess();
    }, []);

    return (
        <div className={styles.Home}>
            {/* 왼쪽 사이드 바 */}
            <SideBar />
            <div id="grid-container" className={styles.Grid_Container}>
                {/* 여기 안에다가 그리드 형식으로 화면을 만들것이다. */}
                {/* <Profile /> */}
                <Weather />
                {/* <Food /> */}
                {/* // <Visitor /> */}
            </div>
        </div>
    );
};

export default home;
