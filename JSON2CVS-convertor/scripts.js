function convertToCSV() {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const jsonData = JSON.parse(jsonInput);

        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            alert('Please provide an array of objects.');
            return;
        }

        const keys = Object.keys(jsonData[0]);

        let csvContent = keys.join(',') + '\n';

        jsonData.forEach(obj => {
            let row = keys.map(key => {
                let value = obj[key] === null || obj[key] === undefined ? '' : obj[key].toString();
                value = value.includes(',') || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value;
                return value;
            }).join(',');
            csvContent += row + '\n';
        });

        downloadCSV(csvContent);
    } catch (error) {
        alert('Invalid JSON format!');
    }
}

function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.download = 'converted.csv';
    downloadLink.style.display = 'inline';
    downloadLink.click();
}