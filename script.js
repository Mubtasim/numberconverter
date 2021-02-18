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

function convert(e) {
    let value = e.target.value;
    if(value=="") clearEverything();
}

allInputs.forEach(el => {
    el.addEventListener('input', convert);
});