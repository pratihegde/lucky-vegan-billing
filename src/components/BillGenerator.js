import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import logo from '../images/logo.png';
import ReactDOMServer from 'react-dom/server';
function formatExcelDate(excelDate) {
    // Check if it's already a formatted string
    if (typeof excelDate === 'string' && excelDate.includes(',')) {
        return excelDate;
    }
    
    // Convert Excel serial number to date
    if (typeof excelDate === 'number' || !isNaN(excelDate)) {
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}th`;
    }
    
    return 'Date not specified';
}
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
                    body {
                        font-family: monospace;
                        font-size: 12px;
                        width: 58mm;
                        margin: 0;
                        padding: 2mm;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    pre {
                        white-space: pre-wrap;
                        margin: 0;
                        width: 100%;
                        overflow: hidden;
                    }
                    @media print {
                        html, body {
                            width: 58mm;
                            height: auto;
                        }
                    }
                </style>
            </head>
            <body>
                <pre>${bill}</pre>
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
// Menu prices and size mappings (keep this outside component)
const menuItems = {
    "CLASSIC HUMMUS": {
        column: "X",
        sizes: {
            X: { size: "L", price: 375 },
            Y: { size: "R", price: 275 }
        }
    },
    "MUHAMMARA": {
        column: "Z",
        sizes: {
            Z: { size: "L", price: 450 },
            AA: { size: "R", price: 350 }
        }
    },
    "SUN DRIED TOMATO PESTO": {
        column: "AB",
        sizes: {
            AB: { size: "L", price: 475 },
            AC: { size: "R", price: 375 }
        }
    },
    "TOFU CC": {
        column: "AD",
        sizes: {
            AD: { size: "L", price: 450 },
            AE: { size: "R", price: 350 }
        }
    },
    "CHILLI GARLIC CC": {
        column: "AF",
        sizes: {
            AF: { size: "L", price: 450 },
            AG: { size: "R", price: 350 }
        }
    },
    "SCALLION CC": {
        column: "AH",
        sizes: {
            AH: { size: "L", price: 450 },
            AI: { size: "R", price: 350 }
        }
    },
    "CLASSIC CHEVRE": {
        column: "AL",
        sizes: {
            AL: { size: "R", price: 390 }
        }
    },
    "SAVORY CHEVRE": {
        column: "AM",
        sizes: {
            AM: { size: "R", price: 440 }
        }
    },
    "DILL CHEVRE": {
        column: "AN",
        sizes: {
            AN: { size: "R", price: 440 }
        }
    },
    "CRANBERRY WALNUT CHEVRE": {
        column: "AO",
        sizes: {
            AO: { size: "R", price: 470 }
        }
    },
    "CRACKERS": {
        column: "AP",
        sizes: {
            AP: { size: "R", price: 135 }
        }
    },
    "PITA": {
        column: "AQ",
        sizes: {
            AQ: { size: "R", price: 135 }
        }
    }
};

const BillGenerator = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [discountPercent, setDiscountPercent] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    const processExcelFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                const sheet2Name = workbook.SheetNames[1];
                const sheet2 = workbook.Sheets[sheet2Name];
                const jsonData = XLSX.utils.sheet_to_json(sheet2, { header: 'A' });
                
                const processedOrders = [];
                
                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    if (!row.C) continue;
                    
                    const totalWithDelivery = Math.round(parseFloat(row.I)) || 0;
                    const subtotalFromExcel = Math.round(parseFloat(row.J)) || 0;
                    const deliveryCharge = totalWithDelivery - subtotalFromExcel;
                    
                    const order = {
                        customerName: row.C,
                        deliveryDate: row.G ? formatExcelDate(row.G) : '',
                        items: [],
                        subtotal: 0,
                        deliveryCharge: deliveryCharge,
                        total: 0
                    };
                    
                    // Process menu items
                    Object.entries(menuItems).forEach(([itemName, itemData]) => {
                        Object.entries(itemData.sizes).forEach(([col, sizeData]) => {
                            const quantity = parseInt(row[col]) || 0;
                            if (quantity > 0) {
                                const price = Math.round(sizeData.price);
                                const itemTotal = Math.round(quantity * price);
                                order.items.push({
                                    name: itemName,
                                    size: sizeData.size,
                                    quantity,
                                    price,
                                    total: itemTotal
                                });
                                order.subtotal += itemTotal;
                            }
                        });
                    });
                    
                    // Use the total from Excel (column I)
                    order.total = totalWithDelivery;
                    
                    if (order.items.length > 0) {
                        processedOrders.push(order);
                    }
                }
                
                setOrders(processedOrders);
            } catch (error) {
                console.error('Error processing file:', error);
                alert('Error processing file. Please check the format.');
            }
        };
        reader.readAsArrayBuffer(file);
    };
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                .no-print {
                    display: none !important;
                }
                .print-only { 
                    display: block !important;
                }
                .print-only.hidden {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);
    const applyDiscount = () => {
        if (!selectedOrder || !discountPercent) return;
        
        const percent = parseFloat(discountPercent);
        if (percent >= 0 && percent <= 100) {
            const discountAmount = Math.round((selectedOrder.subtotal * percent) / 100);
            setAppliedDiscount({
                percentage: percent,
                amount: discountAmount
            });
        } else {
            alert('Please enter a valid discount percentage (0-100)');
            setAppliedDiscount(null);
        }
        setDiscountPercent('');
    };

    const generateBillText = (order) => {
        if (!order) return '';
        
        let billText = `Hi ${order.customerName.toUpperCase()},\n`;
        billText += `Your order total with LUCKY VEGAN for ${order.deliveryDate} is -\n\n`;
        
        // Add items with proper spacing
        order.items.forEach(item => {
            billText += `${item.quantity} x ${item.name} [${item.size}]- ${item.total}/-\n`;
        });
        
        billText += `\nSubtotal - ${order.subtotal}/-`;
        
        // Apply discount if present
        let finalTotal = order.subtotal;
        if (appliedDiscount) {
            billText += `\nDiscount ${appliedDiscount.percentage}% - ${appliedDiscount.amount}/-`;
            finalTotal -= appliedDiscount.amount;
        }
        
        // Add delivery charge
        billText += `\nDELIVERY - ${order.deliveryCharge}/-`;
        finalTotal += order.deliveryCharge;
        
        // Add final total
        
        billText += `\nTOTAL -  ${finalTotal}/-\n\n`;
        
        
        billText += `Kindly pay via UPI to 9920038112 (select LUCKY VEGAN) or via the attached QR code. Please share a screenshot of the payment once it's complete. Thank you!`;
        
        return billText;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 no-print">
            {selectedOrder && <PrintBillIframe bill={generateBillText(selectedOrder)} />}
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                <img 
                    src={logo} 
                    alt="Lucky Vegan Logo" 
                    className="w-32 h-32 object-contain"
                />
                </div>
                    <h1 className="text-4xl font-bold text-amber-800 mb-2">Lucky Vegan Deli</h1>
                    <p className="text-amber-700">Bill Generator</p>
                </div>

                {/* File Upload Area */}
                <div className="mb-8">
                    <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center
                            ${isDragging ? 'border-amber-500 bg-amber-50' : 'border-gray-300'}
                            transition-colors duration-200`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            const file = e.dataTransfer.files[0];
                            if (file) processExcelFile(file);
                        }}
                    >
                        <div className="mb-4">
                            <svg className="w-12 h-12 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="mb-2 text-amber-800">Drag and drop your Excel file here, or</p>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={(e) => processExcelFile(e.target.files[0])}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="inline-block px-4 py-2 bg-amber-600 text-white rounded cursor-pointer hover:bg-amber-700 transition-colors duration-200"
                        >
                            Browse Files
                        </label>
                    </div>
                </div>

                {/* Customer Selection */}
                {/* Customer Selection */}
                {orders.length > 0 && (
                    <div className="mb-8">
                        <label htmlFor="customer-select" className="block mb-2 font-medium text-gray-700">
                            Select a customer:
                        </label>
                        <select
                            id="customer-select"
                            onChange={(e) => setSelectedOrder(orders[e.target.value])}
                            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        >
                            <option value="">Select a customer</option>
                            {orders.map((order, index) => (
                                <option key={index} value={index}>
                                    {order.customerName} - {order.deliveryDate}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedOrder && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                        <div className="flex gap-2 mb-4">
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={discountPercent}
                                onChange={(e) => setDiscountPercent(e.target.value)}
                                placeholder="Enter discount %"
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                onClick={applyDiscount}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Apply Discount
                            </button>
                        </div>
                        {appliedDiscount && (
                            <div className="text-green-600 mb-4">
                                {appliedDiscount.percentage}% discount applied (-₹{appliedDiscount.amount})
                            </div>
                        )}
                    </div>
                )}

                {/* Bill Display */}
                {selectedOrder && (
                    <div className={`bg-white rounded-lg shadow-lg p-6 mb-8 ${selectedOrder ? 'print-only' : 'hidden'}`}>
                    <pre className="whitespace-pre-wrap font-mono text-gray-800 mb-4">
                        {generateBillText(selectedOrder)}
                    </pre>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigator.clipboard.writeText(generateBillText(selectedOrder))}
                                className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                Copy to Clipboard
                            </button>
                            <button
                             onClick={() => {
                                const iframe = document.querySelector('iframe');
                                iframe.contentWindow.print();
                            }}
                                
                            
                            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print Bill
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillGenerator;