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

function baseOfId(nowId) {
    let base = 10;
    if(nowId=='binary') base = 2;
    else if(nowId=='octal') base = 8;
    else if(nowId=='hexaDecimal') base = 16;
    return base;
}

function getDecimalFromBase(value, base) {

}

function getDecimal(value, base) {
    return getDecimalFromBase(value,base);
}

function isOkDigit(digit, base) {
    let codeZero = "0".charCodeAt(0);
    let codeNine = "9".charCodeAt(0);
    let codeA = "A".charCodeAt(0);
    let codeF = "F".charCodeAt(0);
    let codea = "a".charCodeAt(0);
    let codef = "f".charCodeAt(0);
    let codeDigit = digit[0].charCodeAt(0);
    if(base<=10 && ((codeDigit>=codeA && codeDigit<=codeF) || (codeDigit>=codea && codeDigit<=codef))) {
        return false;
    }
    if(codeDigit>=codeZero && codeDigit<=codeNine) {
        return digit<base;
    } else if(!((codeDigit>=codeA && codeDigit<=codeF) || (codeDigit>=codea && codeDigit<=codef))) {
        return false;
    }
    return true;
}

function isOkEveryDigit(value,base) {
    for(let i = 0; i < value.length; i++) {
        if(value[i]=='.') continue;
        if(!isOkDigit(value[i],base)) {
            return false;
        }
    }
    return true;
}

function invalidInput(value, base) {
    let cntOfDot = 0;
    for(let i = 0; i < value.length; i++) {
        if(value[i]=='.') cntOfDot++;
    }
    if(cntOfDot>1) return true;
    return !isOkEveryDigit(value,base);
}

function decimalToBase(decimalValue, base) {

}

function setVals(allVals,allInputs) {

}

function convert(e) {
    let value = e.target.value;
    if(value=="") {
        clearEverything();
        return;
    }
    let nowId = e.target.id;
    base = baseOfId(nowId);
    if(invalidInput(value,base)) {
        console.log("Invalid Input");
        return;
    }
    let decimalValue = getDecimal(value,nowId);
    let allVals = [];
    allVals[0] = decimalValue;
    allVals[1] = decimalToBase(decimalValue,2);
    allVals[2] = decimalToBase(decimalValue,8);
    allVals[3] = decimalToBase(decimalValue,16);
    setVals(allVals,allInputs);    
}

allInputs.forEach(el => {
    el.addEventListener('input', convert);
});