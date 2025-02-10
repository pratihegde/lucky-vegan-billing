import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import logo from '../images/logo.png';
import ReactDOMServer from 'react-dom/server';
import qrCode from '../images/qr-code.png'; 
import { formatExcelDate } from '../utils/dateFormatter';
import PrintBillIframe from './PrintBillIframe';
import { getAllMenuItems } from '../config/menuConfig';
import FileUploadSection from './FileUploadSection';
import BillDisplay from './BillDisplay';
import DiscountSection from './DiscountSection';
import WeeklySpecialsAdmin from './WeeklySpecialsAdmin'; 

const QR_CODE_BASE64 = "data:image/png;base64,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";

// Update the PrintBillIframe component
const BillGenerator = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [discountAmount, setDiscountAmount] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [weeklySpecialPrices, setWeeklySpecialPrices] = useState({ 1: 0, 2: 0 });
    const [editableBillText, setEditableBillText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [showWeeklySpecials, setShowWeeklySpecials] = useState(false);
   
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
                const menuItems = getAllMenuItems();

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
                    Object.entries(menuItems).forEach(([itemCategory, itemInfo]) => {
                        // For weekly specials, use the custom name if available
                        const itemName = itemInfo.name || itemCategory;
                        
                        // Process sizes for this item
                        Object.entries(itemInfo.sizes).forEach(([col, sizeInfo]) => {
                            const quantity = parseInt(row[col]) || 0;
                            if (quantity > 0) {
                                const price = Math.round(sizeInfo.price);
                                const itemTotal = Math.round(quantity * price);
                                order.items.push({
                                    name: itemName,
                                    size: sizeInfo.size,
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
        if (!selectedOrder || !discountAmount) return;
        
        const amount = parseFloat(discountAmount);
        if (amount >= 0 && amount <= selectedOrder.subtotal) {
            const discountedAmount = Math.round(amount);
            setAppliedDiscount({
                amount: discountedAmount
            });
            // Update the order total with the new discount
            const newTotal = selectedOrder.subtotal - discountedAmount + selectedOrder.deliveryCharge;
            setSelectedOrder({
                ...selectedOrder,
                total: newTotal
            });
        } else {
            alert('Please enter a valid discount amount (not more than the subtotal)');
            setAppliedDiscount(null);
        }
        setDiscountAmount('');
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
        if (appliedDiscount && appliedDiscount.amount > 0) {
            billText += `\nDiscount - ${appliedDiscount.amount}/-`;
            finalTotal = order.subtotal - appliedDiscount.amount;
        }
        
        // Add delivery charge
        billText += `\nDELIVERY - ${order.deliveryCharge}/-`;
        finalTotal += order.deliveryCharge;
        
        // Add final total
        billText += `\nTOTAL -  ${finalTotal}/-\n\n`;
        
        billText += `Kindly pay via UPI to 9920038112 (select LUCKY VEGAN) or via the attached QR code. Please share a screenshot of the payment once it's complete. Thank you!`;
        
        return billText;
    };

    const copyToClipboard = async () => {
        const textContent = editableBillText || generateBillText(selectedOrder);
        const htmlContent = `
            <div>
                <pre style="font-family: monospace; white-space: pre-wrap;">${textContent}</pre>
                <div style="text-align: center; margin-top: 16px;">
                    <img src="${qrCode}" style="width: 200px; height: 200px;" alt="Payment QR Code" />
                </div>
            </div>
        `;

        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/html': new Blob([htmlContent], { type: 'text/html' }),
                    'text/plain': new Blob([textContent], { type: 'text/plain' })
                })
            ]);
        } catch (err) {
            // Fallback for browsers that don't support the modern Clipboard API
            navigator.clipboard.writeText(textContent);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 no-print">
            {selectedOrder && (
                <PrintBillIframe bill={editableBillText || generateBillText(selectedOrder)} />
            )}            
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
                    <button
                        onClick={() => setShowWeeklySpecials(!showWeeklySpecials)}
                        className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
                    >
                        {showWeeklySpecials ? 'Back to Bill Generator' : 'Update Weekly Specials'}
                    </button>                
                </div>
    
                {showWeeklySpecials ? (
                    <WeeklySpecialsAdmin />
                ) : (
                    <>
                        {/* File Upload Area */}
                        <FileUploadSection onFileProcess={processExcelFile} />
    
                        {/* Customer Selection */}
                        {orders.length > 0 && (
                            <div className="mb-8">
                                <label htmlFor="customer-select" className="block mb-2 font-medium text-gray-700">
                                    Select a customer:
                                </label>
                                <select
                                    id="customer-select"
                                    onChange={(e) => {
                                        setSelectedOrder(orders[e.target.value]);
                                        setAppliedDiscount(null);  // Reset discount when customer changes
                                        setDiscountAmount('');
                                        setEditableBillText('');  // Reset edited text
                                        setIsEditing(false);     // Also clear the input field
                                    }}
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
                            <DiscountSection 
                                discountAmount={discountAmount}
                                onDiscountChange={setDiscountAmount}
                                onApplyDiscount={applyDiscount}
                                appliedDiscount={appliedDiscount}
                            />
                        )}
    
                        {/* Bill Display */}
                        <BillDisplay 
                            selectedOrder={selectedOrder}
                            isEditing={isEditing}
                            editableBillText={editableBillText}
                            onEditChange={(text) => setEditableBillText(text)}
                            onEditToggle={() => {
                                if (isEditing) {
                                    setIsEditing(false);
                                } else {
                                    if (!editableBillText) {
                                        setEditableBillText(generateBillText(selectedOrder));
                                    }
                                    setIsEditing(true);
                                }
                            }}
                            onCopyToClipboard={copyToClipboard}
                            onPrint={() => {
                                const iframe = document.querySelector('iframe');
                                iframe.contentWindow.print();
                            }}
                            generateBillText={generateBillText}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BillGenerator;