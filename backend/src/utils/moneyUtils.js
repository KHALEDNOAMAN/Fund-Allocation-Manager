const formatCurrency = (amount) => `â‚º${parseFloat(amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
const calculateUtilization = (allocated, total) => total > 0 ? ((allocated / total) * 100).toFixed(1) : '0.0';
module.exports = { formatCurrency, calculateUtilization };
