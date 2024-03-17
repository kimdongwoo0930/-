import Reservation from '@/Component/admin/Create/Reservation';
import React from 'react';

const index = () => {
    return (
        <div>
            <div
                id={'헤더'}
                style={{
                    width: '95%',
                    height: 40,
                    borderBottom: '2px solid gray',
                    fontSize: 25,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                }}
            >
                예약 추가
            </div>
            <Reservation />
        </div>
    );
};

export default index;
