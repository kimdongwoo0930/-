import React, { useEffect, useState } from 'react';

import styles from '@/styles/admin/setting/index.module.css';
import { getAccountInfo } from '@/Api/auth/GetApi';
import getDates from '@/Utils/GetDates';

import { changeStatus, changeRole } from '@/Api/auth/PostApi';

const permissionSetting = () => {
    const [userList, setUserList] = useState([]);
    // 시작할때 서버에서 계정들 정보를 가져와야한다.
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await getAccountInfo();

        if (response.status === 'OK') {
            setUserList(response.data);
        } else if (response?.respose.status === 401) {
            alert('로그인이 필요합니다.');
            window.location.href = '/admin/auth/login';
        } else {
            alert('서버에서 데이터를 가져오는데 실패했습니다.');
        }
    };

    // 승인 미승인이 변경될떄 서버로 전송
    const changeStatusHandler = async (e, Id) => {
        const response = await changeStatus(Id, e);
        if (response.status === 'OK') {
            alert('변경되었습니다.');
            getData();
        } else {
            alert('변경에 실패했습니다.');
        }
    };

    // 사용자 권한 변경시 서버로 전송
    const changeRoleHandler = async (e, Id) => {
        const response = await changeRole(Id, e);
        if (response.status === 'OK') {
            alert('변경되었습니다.');
            getData();
        } else {
            alert('변경에 실패했습니다.');
        }
    };

    // 선택이 달라질경우 수정을 해야한다.

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div className={styles.AccessPermission}>
                <div className={styles.PermissionTitle}>접근 권한 설정</div>
                <div className={styles.PermissionContent}>
                    <div className={styles.PermissionList}>
                        {userList.map((user, index) => {
                            return (
                                <div key={index} className={styles.PermissionItem}>
                                    <div className={styles.PermissionName}>{user.username}</div>
                                    <div className={styles.PermissionState}>
                                        <select
                                            value={user.status}
                                            onChange={(e) => changeStatusHandler(e.target.value, user.userId)}
                                        >
                                            <option value={false}>미승인</option>
                                            <option value={true}>승인</option>
                                        </select>
                                    </div>
                                    <div className={styles.PermissionRole}>
                                        <select
                                            value={user.role}
                                            onChange={(e) => changeRoleHandler(e.target.value, user.userId)}
                                        >
                                            <option value="ROLE_USER">일반 사용자</option>
                                            <option value="ROLE_ADMIN">관리자</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default permissionSetting;
