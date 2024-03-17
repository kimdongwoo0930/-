import SideBar from '@/Component/Menu/SideBar';
import Confirmation from '@/Component/admin/PDF/Confirmation';
import Search from '@/Component/admin/PDF/Search';
import React, { useEffect } from 'react';

const index = () => {
    useEffect(() => {
        window.location.href = 'home';
        alert('준비중입니다.');
    });

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', overflow: 'hidden', minWidth: 1000 }}>
            <SideBar />
            {/* <Search /> */}
            <Confirmation />
        </div>
    );
};

export default index;
