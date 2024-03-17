import React, { useEffect } from 'react';
import SideBar from '@/Component/Menu/SideBar';
import Scheduler from '@/Component/admin/Scheduler/Scheduler';
import HeaderMenu from '@/Component/Menu/HeaderMenu';
import Reservation from '@/Component/admin/Create/Reservation';

import { useState } from 'react';
import Detail from '@/Component/admin/detail/Detail';

import BeforeSave from '@/Component/admin/Modal/BeforeSave';
import { checkToken } from '@/Api/auth/GetApi';

const Scehduler = () => {
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
    const [addReservationTab, setAddReservationTab] = useState(false);
    const [detailTab, setDetailTab] = useState(false);

    /**
     * 수정 부분
     */
    const [loadData, setLoadData] = useState({});

    /**
     * 날짜 관련
     */
    const [currentDate, setCurrentDate] = useState('');

    /**
     * 모달 창
     */
    const [modal, setModal] = useState(false);
    const [saveData, setSaveData] = useState({});

    const [loading, setLoading] = useState(true);

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    opacity: modal ? '0.3' : '1',
                }}
            >
                <SideBar />
                <div style={{ width: '100%' }}>
                    <HeaderMenu openTab={setAddReservationTab} detail={setDetailTab} setloadData={setLoadData} />
                    <Scheduler
                        openDetail={setDetailTab}
                        setCurrentdate={setCurrentDate}
                        openTab={setAddReservationTab}
                        setLoadData={setLoadData}
                        setDetailLoading={setLoading}
                    />
                </div>
                {!detailTab && (
                    <Reservation
                        Tab={addReservationTab}
                        openTab={setAddReservationTab}
                        loadData={loadData}
                        setLoadData={setLoadData}
                        setModal={setModal}
                        setSaveData={setSaveData}
                        setAddReservationTab={setAddReservationTab}
                    />
                )}
                {Object.keys(loadData).length > 0 && detailTab && (
                    <Detail
                        Tab={detailTab}
                        openTab={setDetailTab}
                        setLoadData={setLoadData}
                        setCreateTab={setAddReservationTab}
                        loadData={loadData}
                        Loading={loading}
                    />
                )}
            </div>
            {modal && <BeforeSave Data={saveData} setModal={setModal} />}
        </div>
    );
};

export default Scehduler;
