const decimalInp = document.getElementById('decimal');
const binaryInp = document.getElementById('binary');
const octalInp = document.getElementById('octal');
const hexaInp = document.getElementById('hexaDecimal');
const error = document.getElementById('error');

const allInputs = [];
allInputs[0] = decimalInp;
allInputs[1] = binaryInp;
allInputs[2] = octalInp;
allInputs[3] = hexaInp;

function clearEverything() {
    allInputs.forEach(el => {
        el.value = "";
    });
    error.innerHTML = "";
}

function baseOfId(nowId) {
    let base = 10;
    if(nowId=='binary') base = 2;
    else if(nowId=='octal') base = 8;
    else if(nowId=='hexaDecimal') base = 16;
    return base;
}

function getDotIdx(value) {
    let dotAt = -1;
    value = value.toString();
    for(let i = 0; i < value.length; i++) {
        if(value[i]=='.') dotAt = i;
    }
    return dotAt;
}

function myPow(base, power) {
    let ret = 1;
    for(let i = 0; i < power; i++) ret *= base;
    return ret;
}

function wholeValue(value, base) {
    let codeZero = "0".charCodeAt(0);
    let codeNine = "9".charCodeAt(0);
    let codeA = "A".charCodeAt(0);
    let codeF = "F".charCodeAt(0);
    let codea = "a".charCodeAt(0);
    let codef = "f".charCodeAt(0);
    let ret = 0;
    let power = 0;
    for(let i = value.length-1; i >= 0; i--) {
        let nowDigit = -1;
        let codeDigit = value.charCodeAt(i);
        if(codeDigit>=codea && codeDigit<=codef) nowDigit = codeDigit-codea+10;
        else if(codeDigit>=codeA && codeDigit<=codeF) nowDigit = codeDigit-codeA+10;
        else nowDigit = codeDigit - codeZero;
        ret += nowDigit*myPow(base,power);
        power++;
    }
    return ret;
}

function fracValue(value, base) {
    let codeZero = "0".charCodeAt(0);
    let codeNine = "9".charCodeAt(0);
    let codeA = "A".charCodeAt(0);
    let codeF = "F".charCodeAt(0);
    let codea = "a".charCodeAt(0);
    let codef = "f".charCodeAt(0);
    let ret = 0;
    let power = 1;
    for(let i = 0; i < value.length; i++) {
        let nowDigit = -1;
        let codeDigit = value.charCodeAt(i);
        if(codeDigit>=codea && codeDigit<=codef) nowDigit = codeDigit-codea+10;
        else if(codeDigit>=codeA && codeDigit<=codeF) nowDigit = codeDigit-codeA+10;
        else nowDigit = codeDigit - codeZero;
        ret += nowDigit*(1/myPow(base,power));
        power++;
    }
    return ret;
}

function getDecimalFromBase(value, base) {
    if(base==10) return value;
    let dotAt = getDotIdx(value);
    if(dotAt==-1) {
        return wholeValue(value,base);
    }
    if(dotAt==0) {
        return fracValue(value.substring(1,value.length),base);
    }
    let wholePart = value.substring(0,dotAt);
    let fracPart = value.substring(dotAt+1,value.length);
    // console.log(fracPart);
    return wholeValue(wholePart,base) + fracValue(fracPart,base);
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

function reverse(str) {
    let ret = "";
    for(let i = str.length-1; i >= 0; i--) {
        ret += str[i];
    }
    return ret;
}

function valueOfRemainder(value) {
    let hexs = ['A','B','C','D','E','F'];
    if(value>9) return hexs[value-10];
    return value.toString();
}

function decimalToBaseWhole(value, base) {
    let ret = "";
    value = parseInt(value);
    while(value>0) {
        let remainder = value%base;
        ret += valueOfRemainder(remainder);
        value /= base;
        value = Math.floor(value);
    }
    let reverseStr = reverse(ret);
    // console.log(reverseStr,base);
    if(reverseStr=="") return "0";
    return reverseStr;
}

function decimalToBaseFrac(value, base) {
    console.log(value);
    let ret = "";
    value = parseFloat(value);
    console.log("value",value);
    let step = 1;
    while(true) {
        if(step>10) break;
        let remainder = value%10;
        // ret += valueOfRemainder(remainder);
        let mult = value*base;
        let whole = Math.floor(mult);
        let frac = mult-whole;
        ret += valueOfRemainder(whole);
        if(frac == 0) break;
        value = frac;
        step++;
    }
    // let reverseStr = reverse(ret);
    // console.log(reverseStr,base);
    // if(reverseStr=="") return "0";
    // return reverseStr;
    // return "";
    return ret;
}

function decimalToBase(decimalValue, base) {
    // console.log("decimalValue",decimalValue);
    decimalValue = decimalValue.toString();
    let dotAt = getDotIdx(decimalValue);
    console.log("dotat",dotAt);
    if(dotAt==-1) return decimalToBaseWhole(decimalValue,base);
    if(dotAt==0) return decimalToBaseFrac(decimalValue.substring(0,decimalValue.length),base);
    let wholePart = decimalValue.substring(0,dotAt);
    let fracPart = decimalValue.substring(dotAt,decimalValue.length);
    let wholeValue = decimalToBaseWhole(wholePart,base);
    let fracValue = decimalToBaseFrac(fracPart,base);
    // console.log(fracValue,base);
    console.log(wholeValue,fracValue);
    return wholeValue + "." + fracValue;
}

function setVals(allVals,allInputs) {
    for(let i = 0; i < 4; i++) {
        allInputs[i].value = allVals[i];
    }
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
        error.innerHTML = "Invalid Input";
        return;
    }
    // console.log("noterror");
    error.innerHTML = "";
    let dotAt = getDotIdx(value);
    if(dotAt==value.length-1) {
        return;
    }
    let decimalValue = getDecimal(value,base);
    console.log("The decimal value is: " + decimalValue);
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