import React, { useState, useEffect } from 'react';

const WeeklySpecialsAdmin = () => {
    const [specialSalad, setSpecialSalad] = useState({
        name: '',
        basePrice: 390,  // Default price
        chevrePrice: 490 // Default chevre price
    });

    const [specialDip, setSpecialDip] = useState({
        name: '',
        smallPrice: 0,  // 150g price
        largePrice: 0   // 250g price
    });

    // Load saved specials when component mounts
    useEffect(() => {
        const savedSpecials = localStorage.getItem('weeklySpecials');
        if (savedSpecials) {
            const parsed = JSON.parse(savedSpecials);
            setSpecialSalad(parsed.specialSalad || specialSalad);
            setSpecialDip(parsed.specialDip || specialDip);
        }
    }, []);

    const handleSave = () => {
        const specialsData = {
            specialSalad,
            specialDip
        };
        
        // Save to localStorage
        localStorage.setItem('weeklySpecials', JSON.stringify(specialsData));
        
        // Show success message
        alert('Weekly specials updated successfully!');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-amber-800 mb-6">Update Weekly Specials</h1>
                
                {/* Special Salad Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-amber-700 mb-4">Special Salad (Column R/S)</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Salad Name
                            </label>
                            <input
                                type="text"
                                value={specialSalad.name}
                                onChange={(e) => setSpecialSalad({
                                    ...specialSalad,
                                    name: e.target.value
                                })}
                                placeholder="e.g., Mediterranean Quinoa Salad"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Base Price (R)
                                </label>
                                <input
                                    type="number"
                                    value={specialSalad.basePrice}
                                    onChange={(e) => setSpecialSalad({
                                        ...specialSalad,
                                        basePrice: Number(e.target.value)
                                    })}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    With Chevre Price (S)
                                </label>
                                <input
                                    type="number"
                                    value={specialSalad.chevrePrice}
                                    onChange={(e) => setSpecialSalad({
                                        ...specialSalad,
                                        chevrePrice: Number(e.target.value)
                                    })}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Special Dip Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-amber-700 mb-4">Special Dip/Cheese (Column T/U)</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dip/Cheese Name
                            </label>
                            <input
                                type="text"
                                value={specialDip.name}
                                onChange={(e) => setSpecialDip({
                                    ...specialDip,
                                    name: e.target.value
                                })}
                                placeholder="e.g., Smoked Tofu Cream Cheese"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    150g Price (T)
                                </label>
                                <input
                                    type="number"
                                    value={specialDip.smallPrice}
                                    onChange={(e) => setSpecialDip({
                                        ...specialDip,
                                        smallPrice: Number(e.target.value)
                                    })}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    250g Price (U)
                                </label>
                                <input
                                    type="number"
                                    value={specialDip.largePrice}
                                    onChange={(e) => setSpecialDip({
                                        ...specialDip,
                                        largePrice: Number(e.target.value)
                                    })}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-semibold"
                >
                    Save Weekly Specials
                </button>
            </div>
        </div>
    );
};

export default WeeklySpecialsAdmin;