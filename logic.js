document.addEventListener('DOMContentLoaded', function() {
    calcInit();
}, false);

var calc = {};

function calcInit() {
    calc.equation = '';
    calc.displayValue = '';
    calc.firstNumber = null;
    calc.secondNumber = null;
    calc.operator = null;
    calc.currentNumber = '';
    calc.isEqualled = false;

    return calc;
}

function inputNumber(digit) {
    if (calc.isEqualled === true) {
        calcInit()
        console.log(calc)
    }
    if (digit === '.' && !isNumber(calc.currentNumber)) {
        calc.currentNumber = '0.'
        digit = '0.'
        console.log(digit)
    } else if (calc.currentNumber === '0.') {
        calc.currentNumber += digit
    } else if (calc.currentNumber === calc.operator) {
        calc.currentNumber = digit
     } else {
    calc.currentNumber += digit; 
    }
    calc.equation += digit;
    console.log(calc)
}

function inputOperator (operator) {
    let output = 0;
    if (!isNumber(calc.currentNumber)) {
        calc.operator = operator;
        calc.equation = calc.equation.substring(0, calc.equation.length - 3);
        calc.equation += (` ${operator} `);
        calc.currentNumber = operator;
        return;
    }
    if (calc.operator === null) {
        calc.firstNumber = calc.currentNumber;
        calc.operator = operator;
        calc.currentNumber = operator;
    } 
    else if (calc.isEqualled === true) {
        calc.secondNumber = calc.currentNumber
        output = doMathStuff(calc.firstNumber, calc.secondNumber, calc.operator)
        calc.firstNumber = output.toString();
        calc.operator = operator;
        calc.currentNumber = operator;
        calc.equation = calc.firstNumber;
        calc.isEqualled = false;
    } else {
        calc.secondNumber = calc.currentNumber
        output = doMathStuff(calc.firstNumber, calc.secondNumber, calc.operator)
        calc.firstNumber = output.toString();
        calc.operator = operator;
        calc.currentNumber = operator;
    }
    calc.equation += (` ${operator} `);
}

function inputEquals(value) {
    var output = 0;
    calc.secondNumber = calc.currentNumber;
    output = doMathStuff(calc.firstNumber, calc.secondNumber, calc.operator)
    calc.displayValue = output;
    calc.equation += (` ${value} ${output.toString()}`)
    document.getElementById('outputDisplay').innerHTML = calc.displayValue;
    calc.isEqualled = true;
}

function turnStringToNumber(str) {
    return parseFloat(str);
}

function isNumber(string) {
    return parseFloat(string).toString() === string.toString();
}

function doMathStuff(firstNumberString, secondNumberString, operator) {
    let returnValue = 0;
    let firstVar = turnStringToNumber(firstNumberString);
    let secondVar = turnStringToNumber(secondNumberString);

    if (operator === '+') {
        returnValue = firstVar + secondVar;
    } else if (operator === '-') {
        returnValue = firstVar - secondVar;
    } else if (operator === '*') {
        returnValue = firstVar * secondVar;
    } else if (operator === '/') {
        returnValue = firstVar / secondVar;
    }
    returnValue = returnValue.toFixed(4);
    return parseFloat(returnValue);
} 


//functions called solely by event handlers
function updateEquation() {
    document.getElementById('equation-display').innerHTML = calc.equation;
}

function updateOutputDisplay() {
    document.getElementById('outputDisplay').innerHTML = calc.currentNumber;
}

function updateOutputOperator() {
    document.getElementById('outputDisplay').innerHTML = calc.operator;
}


document.querySelectorAll('.number').forEach(function(el){el.addEventListener('click', function() {
    inputNumber(this.value)
    updateOutputDisplay(calc.currentNumbers)
    ;
})})
document.querySelectorAll('.operator').forEach(function(el){el.addEventListener('click', function() {
    inputOperator(this.value);
    updateOutputOperator()
})})
document.getElementById('equals').addEventListener('click', function() {
    inputEquals(this.value);
})
document.querySelectorAll('button').forEach(function(el){el.addEventListener('click', function() {
    updateEquation();
})})

document.getElementById('clear').addEventListener('click', function() {
    calcInit();
    document.getElementById('equation-display').innerHTML = '0'
    document.getElementById('outputDisplay').innerHTML = '0'
})

