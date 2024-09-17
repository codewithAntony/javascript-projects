let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    if (currentInput.length < 8) {
        currentInput += number;
        updateDisplay();
    }
}

function setOperation(op) {
    if (operation !== null) 
        calculate();
    operation = op;
    previousInput = currentInput;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || previousInput === '') 
        return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'ERR';
                return;
            }
            result = prev / current;
            break;
    }
    if (result.toString().length > 8) {
        display.value = 'ERR';
    } else {
        currentInput = result.toString();
        updateDisplay();
    }
    operation = null;
    previousInput = '';
    shouldResetDisplay = true;
}

function clearEntry() {
    if (operation === null) {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
    } else {
        operation = null;
        currentInput = previousInput;
        previousInput = '';
    }
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

// Initialize display
updateDisplay();