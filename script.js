const decimalInp = document.getElementById('decimal');
const binaryInp = document.getElementById('binary');
const octalInp = document.getElementById('octal');
const hexaInp = document.getElementById('hexaDecimal');

const allInputs = [];
allInputs[0] = decimalInp;
allInputs[1] = binaryInp;
allInputs[2] = octalInp;
allInputs[3] = hexaInp;

function clearEverything() {
    allInputs.forEach(el => {
        el.value = "";
    });
}



function getDecimal(value, nowId) {
    let base = 10;
    if(nowId=='binary') base = 2;
    else if(nowId=='octal') base = 8;
    else if(nowId='hexaDecimal') base = 16;
    return getDecimalFromBase(value,base);
}

function convert(e) {
    let value = e.target.value;
    if(value=="") {
        clearEverything();
        return;
    }
    let nowId = e.target.id;
    if(invalidInput(value,nowId)) {
        console.log("Invalid Input");
        return;
    }
    let decimalValue = getDecimal(value,nowId);
}

allInputs.forEach(el => {
    el.addEventListener('input', convert);
});