import React, { useEffect } from 'react';

import styles from '@/styles/admin/Reservation/SideBar.module.css';

import * as OpenPopup from '@/Utils/OpenPopup';
import { getPermission } from '@/Api/auth/GetApi';

const HeaderMenu = ({ openTab, detail, setloadData }) => {
    const CheckPermission = async () => {
        const response = await getPermission();
        if (response === 200) {
            openTab(true);
            detail(false);
            setloadData({});
        } else if (response?.response.status === 500) {
            // 토큰 만료
            alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
            window.location.href = '/admin/auth/login';
        } else {
            alert('접근 권한이 없습니다.');
        }
    };

    return (
        <div className={styles.headerMenuContainer}>
            <h1>예약 현황</h1>
            <div>
                <span
                    onClick={() => {
                        CheckPermission();
                    }}
                >
                    예약 추가
                </span>
                <span onClick={() => OpenPopup.openLoad()}>이력 조회</span>
            </div>
        </div>
    );
};

export default HeaderMenu;
