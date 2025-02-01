// Cut lines 40-82 from BillGenerator.js and paste here:
import React from 'react';
import qrCode from '../images/qr-code.png';

const PrintBillIframe = ({ bill }) => {
    const iframeContent = `
        <html>
            <head>
                <title>Print Bill</title>
                <style>
                    @page {
                        size: 58mm auto;
                        margin: 0mm;
                    }
                    // ... rest of the styles
                </style>
            </head>
            <body>
                <pre>${bill}</pre>
                <img src="${qrCode}" class="qr-code" alt="Payment QR Code" />
            </body>
        </html>
    `;

    return (
        <iframe 
            srcDoc={iframeContent} 
            style={{ display: 'none' }}
            title="Print Frame"
        />
    );
};

export default PrintBillIframe;