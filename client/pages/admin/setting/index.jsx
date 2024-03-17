import SideBar from '@/Component/Menu/SideBar';
import React, { useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import styles from '@/styles/admin/setting/index.module.css';

import PermissionSetting from '@/Component/admin/Setting/permissionSetting';
import AccountSetting from '@/Component/admin/Setting/AccountSetting';

import { useEffect } from 'react';
import { checkToken, getPermission } from '@/Api/auth/GetApi';
import { useRouter } from 'next/router';

const settingHome = () => {
    const router = useRouter();
    useEffect(() => {
        const CheckAccess = async () => {
            // 토큰 존재 여부
            if (!localStorage.getItem('token')) {
                alert('잘못된 접근입니다.');
                router.push('/admin/auth/login');
            }
            const response = await checkToken();
            if (response !== 200) {
                alert('만료되었습니다. 다시 로그인 해주세요.');
                router.push('/admin/auth/login');
            }
        };
        const CheckPermissions = async () => {
            const response = await getPermission();
            if (response !== 200) {
                alert('접근 권한이 없습니다.');
                router.push('/admin/home');
            }
        };
        CheckAccess();
        CheckPermissions();
    }, []);
    // 설정 메뉴 로고
    const [selectMenu, setSelectMenu] = useState('설정 메뉴');

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden' }}>
            <SideBar />
            <div className={styles.settingContainer}>
                <div className={styles.header}>
                    <h2>{selectMenu}</h2>
                </div>
                <div className={styles.settingBody}>
                    <div className={styles.settingMenu}>
                        <ul>
                            <li onClick={() => setSelectMenu('계정 설정')}>계정 설정</li>
                            <li onClick={() => setSelectMenu('권한 설정')}>권한 설정</li>
                        </ul>
                    </div>

                    <div className={styles.settingContent}>
                        <CSSTransition
                            in={selectMenu === '계정 설정'}
                            timeout={{
                                enter: 500,
                            }}
                            mountOnEnter
                            unmountOnExit
                            classNames={{
                                enter: styles.PermissionSettingEnter,
                            }}
                        >
                            <AccountSetting />
                        </CSSTransition>
                        <CSSTransition
                            in={selectMenu === '권한 설정'}
                            timeout={{
                                enter: 500,
                            }}
                            mountOnEnter
                            unmountOnExit
                            classNames={{
                                enter: styles.PermissionSettingEnter,
                            }}
                        >
                            <PermissionSetting />
                        </CSSTransition>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default settingHome;
