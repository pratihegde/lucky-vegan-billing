import React from 'react';
import qrCode from '../images/qr-code.png';

const PrintBillIframe = ({ bill }) => {
    const iframeContent = `
        <html>
            <head>
                <title>Print Bill</title>
                <style>
                    @page {
                        size: 58mm auto;  /* 58mm is standard size for 50mm thermal printers */
                        margin: 0mm;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: monospace;
                        font-size: 10px;  /* Reduced font size for narrower width */
                        line-height: 1.2;
                        width: 48mm;  /* Standard printable width for 50mm printers */
                        max-width: 48mm;
                    }
                    pre {
                        margin: 0;
                        padding: 2mm;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-size: 10px;
                        line-height: 1.2;
                    }
                    .qr-code {
                        display: block;
                        width: 100px;  /* Reduced QR size to fit narrower paper */
                        height: 100px;
                        margin: 8px auto;
                    }
                    @media print {
                        body {
                            width: 48mm;
                        }
                        pre {
                            white-space: pre-wrap;
                        }
                    }
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