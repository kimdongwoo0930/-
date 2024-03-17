// pages/index.js
import Quotation from '@/Component/admin/PDF/Quotation';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { renderToString } from 'react-dom/server';
import html2canvas from 'html2canvas';

const HomePage = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'gray',
            }}
        >
            <button style={{ width: 50, height: 30 }} onClick={() => saveAsPdf()}>
                Test
            </button>
            <Quotation />
        </div>
    );
};

export default HomePage;
