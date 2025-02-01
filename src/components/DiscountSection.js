import React from 'react';

const DiscountSection = ({ 
    discountAmount, 
    onDiscountChange, 
    onApplyDiscount, 
    appliedDiscount 
}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    min="0"
                    value={discountAmount}
                    onChange={(e) => onDiscountChange(e.target.value)}
                    placeholder="Enter discount amount"
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={onApplyDiscount}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Apply Discount
                </button>
            </div>
            {appliedDiscount && (
                <div className="text-green-600 mb-4">
                    Discount applied: -₹{appliedDiscount.amount}
                </div>
            )}
        </div>
    );
};

export default DiscountSection;