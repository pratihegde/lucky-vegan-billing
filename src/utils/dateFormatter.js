export function formatExcelDate(excelDate) {
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