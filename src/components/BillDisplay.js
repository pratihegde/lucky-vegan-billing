import React from 'react';
import qrCode from '../images/qr-code.png';

const BillDisplay = ({ 
    selectedOrder, 
    isEditing, 
    editableBillText, 
    onEditChange,
    onEditToggle, 
    onCopyToClipboard, 
    onPrint,
    generateBillText 
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg p-6 mb-8 ${selectedOrder ? 'print-only' : 'hidden'}`}>
            {isEditing ? (
                <textarea
                    value={editableBillText}
                    onChange={(e) => onEditChange(e.target.value)}
                    className="whitespace-pre-wrap font-mono text-gray-800 mb-4 w-full h-96 p-2 border rounded"
                />
            ) : (
                <div className="space-y-4">
                    <pre className="whitespace-pre-wrap font-mono text-gray-800">
                        {editableBillText || generateBillText(selectedOrder)}
                    </pre>
                    <div className="flex justify-center">
                        <img 
                            src={qrCode} 
                            alt="Payment QR Code"
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                </div>
            )}
            <div className="flex gap-4">
                <button
                    onClick={onEditToggle}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Save Edit' : 'Edit Bill'}
                </button>
                <button
                    onClick={onCopyToClipboard}
                    className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy to Clipboard
                </button>
                <button
                    onClick={onPrint}
                    className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Bill
                </button>
            </div>
        </div>
    );
};

export default BillDisplay;