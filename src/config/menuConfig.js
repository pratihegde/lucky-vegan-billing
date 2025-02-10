// menuConfig.js

export const fixedMenuItems = {
    "CLASSIC HUMMUS": {
        sizes: {
            "V": { size: "150g", price: 290 },
            "W": { size: "250g", price: 390 }
        }
    },
    "MUHAMMARA": {
        sizes: {
            "X": { size: "150g", price: 325 },
            "Y": { size: "250g", price: 425 }
        }
    },
    "PESTO": {
        sizes: {
            "Z": { size: "150g", price: 375 },
            "AA": { size: "250g", price: 475 }
        }
    },
    "TOFU CREAM CHEESE": {
        sizes: {
            "AB": { size: "150g", price: 375 },
            "AC": { size: "250g", price: 475 }
        }
    },
    "CHILLI GARLIC CREAM CHEESE": {
        sizes: {
            "AD": { size: "150g", price: 375 },
            "AE": { size: "250g", price: 475 }
        }
    },
    "SCALLION CREAM CHEESE": {
        sizes: {
            "AF": { size: "150g", price: 375 },
            "AG": { size: "250g", price: 475 }
        }
    },
    "CLASSIC CHEVRE": {
        sizes: {
            "AJ": { size: "100g", price: 350 }
        }
    },
    "SAVORY CHEVRE": {
        sizes: {
            "AK": { size: "100g", price: 350 }
        }
    },
    "DILL CHEVRE": {
        sizes: {
            "AL": { size: "100g", price: 350 }
        }
    },
    "CRANBERRY WALNUT CHEVRE": {
        sizes: {
            "AM": { size: "100g", price: 470 }
        }
    },
    "CRACKERS": {
        sizes: {
            "AN": { size: "pack", price: 200 }
        }
    },
    "PITA": {
        sizes: {
            "AO": { size: "pack", price: 200 }
        }
    },
    "RAGI LAVACHE": {
        sizes: {
            "AP": { size: "pack", price: 200 }
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
                "T": { size: "150g", price: specialDip.smallPrice },
                "U": { size: "250g", price: specialDip.largePrice }
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