// menuConfig.js

export const fixedMenuItems = {
    "CLASSIC HUMMUS": {
        sizes: {
            "V": { size: "250g", price: 375 },
            "W": { size: "150g", price: 275 }
        }
    },
    "MUHAMMARA": {
        sizes: {
            "X": { size: "250g", price: 450 },
            "Y": { size: "150g", price: 350 }
        }
    },
    "PESTO": {
        sizes: {
            "Z": { size: "250g", price: 475 },
            "AA": { size: "150g", price: 375 }
        }
    },
    "TOFU CREAM CHEESE": {
        sizes: {
            "AB": { size: "250g", price: 450 },
            "AC": { size: "150g", price: 350 }
        }
    },
    "CHILLI GARLIC CREAM CHEESE": {
        sizes: {
            "AD": { size: "250g", price: 450 },
            "AE": { size: "150g", price: 350 }
        }
    },
    "SCALLION CREAM CHEESE": {
        sizes: {
            "AF": { size: "250g", price: 450 },
            "AG": { size: "150g", price: 350 }
        }
    },
    "CLASSIC CHEVRE": {
        sizes: {
            "AJ": { size: "150g", price: 390 }
        }
    },
    "SAVORY CHEVRE": {
        sizes: {
            "AK": { size: "150g", price: 440 }
        }
    },
    "DILL CHEVRE": {
        sizes: {
            "AL": { size: "150g", price: 440 }
        }
    },
    "CRANBERRY WALNUT CHEVRE": {
        sizes: {
            "AM": { size: "150g", price: 470 }
        }
    },
    "CRACKERS": {
        sizes: {
            "AN": { size: "pack", price: 135 }
        }
    },
    "PITA": {
        sizes: {
            "AO": { size: "pack", price: 135 }
        }
    },
    "RAGI LAVACHE": {
        sizes: {
            "AP": { size: "pack", price: 135 }
        }
    }
};

// Function to get weekly specials from localStorage
export const getWeeklySpecials = () => {
    const savedSpecials = localStorage.getItem('weeklySpecials');
    if (!savedSpecials) return null;

    const { specialSalad, specialDip } = JSON.parse(savedSpecials);
    
    return {
        "SPECIAL SALAD": {
            name: specialSalad.name,
            sizes: {
                "R": { size: "Regular", price: specialSalad.basePrice },
                "S": { size: "with Chevre", price: specialSalad.chevrePrice }
            }
        },
        "SPECIAL DIP": {
            name: specialDip.name,
            sizes: {
                "T": { size: "250g", price: specialDip.largePrice },
                "U": { size: "150g", price: specialDip.smallPrice }
            }
        }
    };
};

// Function to get all menu items including weekly specials
export const getAllMenuItems = () => {
    const weeklySpecials = getWeeklySpecials();
    return {
        ...weeklySpecials,
        ...fixedMenuItems
    };
};