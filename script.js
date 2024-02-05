const calculatorDisplay = document.querySelector('h1');
const inputBtns =document.querySelectorAll('button');
const clearBtn = document.getElementById('clearBtn');
const delBtn = document.getElementById('delBtn');

let firstValue = 0;
let operatorValue = '';
let awaitingnext = false;

function sendNum(number){
    // replace current display value if first value is entered
    if (awaitingnext){
        calculatorDisplay.textContent = number;
        awaitingnext = false;
    }else{
        // if current display value is 0, replace it, if not add number
     const displayValue = calculatorDisplay.textContent;
     calculatorDisplay.textContent = displayValue === '0' ? number :
     displayValue + number;

    }
}

function addDecimal(){
// operator pressed, dont' add decimal
if (awaitingnext) return;
//if no decimal , add one
if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}   
}

// calculate first and second values depending on operator
const calculate = {
  '/':(firstNumber,secondNumber) => firstNumber / secondNumber,

  '*':(firstNumber,secondNumber) => firstNumber * secondNumber,

  '+':(firstNumber,secondNumber) => firstNumber + secondNumber,

  '-':(firstNumber,secondNumber) => firstNumber - secondNumber,

  '%':(firstNumber,secondNumber) => firstNumber % secondNumber,

  '=':(firstNumber,secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (operatorValue && awaitingnext) {
        operatorValue = operator;
        return;
    }
    // assign firstValue if no value
    if (!firstValue){
        firstValue = currentValue
    }
    else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // ready for the next value,store operator
    awaitingnext = true
    operatorValue = operator;
    
}


inputBtns.forEach((inputBtn)=>{
 if(inputBtn.classList.length==0){
    inputBtn.addEventListener('click', ()=> sendNum(inputBtn.value));
 }
 else if (inputBtn.classList.contains('operator')){
 inputBtn.addEventListener('click', ()=>  useOperator(inputBtn.value));
}
else if (inputBtn.classList.contains('decimal')){
    inputBtn.addEventListener('click', ()=>  addDecimal());
   }
});
// reset al display
function reset(){
    firstValue = 0;
    operatorValue = '';
    awaitingnext = false;
    calculatorDisplay.textContent = '0'
}


function del(params) {
    firstValue = 0;
    operatorValue = '';
    awaitingnext = false;
    calculatorDisplay.textContent=calculatorDisplay.textContent.slice(0,-1)
}
// event listener
clearBtn.addEventListener('click',reset);
delBtn.addEventListener('click',del);