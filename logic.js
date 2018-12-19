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

document.querySelectorAll('.grid-item').forEach(function(el){el.addEventListener('click', function() {
    inputDigit(this.value);
    updateDisplay();
});
})

const calculator = {
    displayValue: '0',
    firstVal: null,
    secondVal: false,
    operator: null,
  };

  function inputDigit(digit) {
    const { displayValue } = calculator;
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

function updateDisplay() {
    const display = document.querySelector('.calc-scn');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();