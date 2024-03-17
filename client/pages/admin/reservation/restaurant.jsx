import Food from '@/Component/admin/Restaurant/Food';

import React from 'react';

const restaurant = () => {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', overflow: 'hidden' }}>
            <Food />
        </div>
    );
};

export default restaurant;
