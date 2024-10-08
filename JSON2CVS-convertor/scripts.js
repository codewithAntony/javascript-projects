// Function to flatten nested JSON

function flattenJSON(data, parentKey = '', result = {}) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof data[key] === 'object' && data[key] !== null && !Array.isArray(data[key])) {
                flattenJSON(data[key], newKey, result);
            } else {
                result[newKey] = data[key];
            }
        }
    }
    return result;
}


function jsonToCSV(jsonData) {
    const flatData = jsonData.map(obj => flattenJSON(obj));

    const csvHeaders = Object.keys(flatData.reduce((acc, curr) => {
        return Object.assign(acc, curr);
    }, {}));

    const csvRows = flatData.map(row => {
        return csvHeaders.map(header => {
            return row[header] !== undefined ? `"${row[header]}"` : '""';
        }).join(',');
    });

    return [csvHeaders.join(','), ...csvRows].join('\n');
}

document.getElementById('convertToCSVBtn').addEventListener('click', () => {
    const jsonInput = document.getElementById('jsonInput').value;

    try {
        const jsonData = JSON.parse(jsonInput);

        const dataToConvert = Array.isArray(jsonData) ? jsonData : [jsonData];

        const csvOutput = jsonToCSV(dataToConvert);
        document.getElementById('csvOutput').value = csvOutput;
    } catch (e) {
        alert("Invalid JSON. Please check your input.")
    }
})

// CSV to JSON conversion
function csvToJSON(csv) {
    const [headers, ...rows] = csv.split('\n').map(row => row.split(','));
    
    return rows.map(row => {

        let obj ={};
        headers.forEach((header, index) => {
            obj[header] = row[index].replace(/"/g, '');
        });
        return obj;
    });
}

document.getElementById('convertToJSONBtn').addEventListener('click', () => {
    const csvInput = document.getElementById('csvInput').value;

    try {
        const jsonOutput = JSON.stringify(csvToJSON(csvInput), null, 4);
        document.getElementById('jsonOutput').value = jsonOutput;
    } catch (e) {
        alert("Invalid CSV. Please check your input.")
    }
})

// Clear JSON Input and Output
document.getElementById('clearJSONBtn').addEventListener('click', () => {
    document.getElementById('jsonInput').value = '';
    document.getElementById('csvOutput').value = '';
})

// Clear CSV Input and Output
document.getElementById('clearCSVBtn').addEventListener('click', () => {
    document.getElementById('csvInput').value = '';
    document.getElementById('jsonOutput').value = '';
});