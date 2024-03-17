import React from 'react';
import styles from '@/styles/admin/Home/Home.module.css';

import { CgProfile } from 'react-icons/cg';

const Profile = () => {
    return (
        <div className={styles.ProfileContainer}>
            <div className={styles.profilePhoto}>
                <CgProfile />
            </div>
            <div className={styles.profileRole}>
                <span>관리자</span>
            </div>
            <div className={styles.profileName}>
                <span>김동우</span>
            </div>
        </div>
    );
};

export default Profile;
