/* 

Log button clicks to the console

The button clicks need to be pushed to the calc equation until an operator comes up. if typeof number? (+-%=)

That value needs to be displayed in the cal equation field and should be updated at every event

First calc equation value should be logged to calc output until the 'end enter condition' is met

When an operator is hit the equals function should be initiated

Should we have a global variable that all functions can access?

number / 0 should equals error

Necessary functions:
Data validation - no double zeros to begin with, if double operators are entered the last on entered should be the one used, only one decimal point per number, an
operator can't be the first thing entered (i.e a number should be), pressing an operator immediately following = should start a new calculation that operates on the 
result of the previous evaluation.

Addition function
Subtraction function
Multiply function
Divide function
Decimal Function
Numeric function (0-9)
AC / clear function

keyStroke function {
    if number push to SECONDVal var
    if operator add to operator var and call equals function
    if equals call equals function 
    if AC call AC function
}

global vars: 
firstVal
operator
secondVal

function equals () {
    let varOne = 2;
    let operator = '+';
    let varTwo = 5;
    let output = 0;
    if (operator === '+') {
        output = varOne + varTwo;
    }
    console.log(output);
}

equals();



document.addEventListener('click', buttonIdent());

let equation = [];
let secondVal = 0;
let output = secondVal;
let firstVal = [];
let operator = [];


var buttons = document.getElementsByTagName("button");
var buttonsCount = buttons.length;
for (var i = 0; i < buttonsCount; i += 1) {
    buttons[i].onclick = function(e) {
    alert(this.id);
}


keyVal = () => {
    console.log(document.getElementById("seven").value)
}

keyVal();

//keyStroke = (value) => {
    
*/
document.addEventListener('DOMContentLoaded', function() {
    calcInit();
}, false);

/*calc = {
    equation: '',
    displayValue: '',
    firstNumber: null,
    secondNumber: null,
    operator: null,
    currentNumber: '',
    isEqualled: false,
}  */
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

console.log(calc)

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
        console.log(calc)
    } else {
        calc.secondNumber = calc.currentNumber
        output = doMathStuff(calc.firstNumber, calc.secondNumber, calc.operator)
        calc.firstNumber = output.toString();
        calc.operator = operator;
        calc.currentNumber = operator;
    }
    calc.equation += (` ${operator} `);
    

    /*console.log('firstNumber', calc.firstNumber)
    console.log('secondNumber', calc.secondNumber)*/
}

function inputEquals(value) {
    var output = 0;
    calc.secondNumber = calc.currentNumber;
    output = doMathStuff(calc.firstNumber, calc.secondNumber, calc.operator)
    calc.displayValue = output;
    calc.equation += (` ${value} ${output.toString()}`)
    document.getElementById('outputDisplay').innerHTML = calc.displayValue;
    calc.isEqualled = true,
    console.log('calc', calc);

    console.log('output', output.toString());
    console.log('value', value);
    console.log('firstNumber', calc.firstNumber)
    console.log('secondNumber', calc.secondNumber)
    console.log('displayValue', calc.displayValue);
    console.log('equation', calc.equation);
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
    console.log('current number', calc.currentNumber)
})})

document.getElementById('clear').addEventListener('click', function() {
    calcInit();
    updateEquation();
    updateOutputDisplay();
    console.log(calc)
})

