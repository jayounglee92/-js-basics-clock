const rangeEl = document.querySelector('.numberRange');
const maxNumEl = document.querySelector('.maxNum');
const numberGuessEl = document.querySelector('.numberGuess');
const playBtn = document.querySelector('.playBtn');
const gradeStn = document.querySelector('.gradeStn');


function setMaxValueInRange(e) {
    const maxNum  = e.target.value;
    maxNumEl.innerText = maxNum;
    setMaxValueInNumber(maxNum);
}

function setMaxValueInNumber(maxNum) {
    numberGuessEl.max = maxNum;
}

function clickPlayBtn() {
    const yourNum = numberGuessEl.value;
    const machineNum = getRandomNum(0, rangeEl.value);
    gradeStn.innerText = `You choose ${yourNum}, the machine choose: ${machineNum}`;

    showResult(yourNum, machineNum);
}

function showResult(yourNum, machineNum) {
    const resultStn = document.querySelector('.resultStn');
    
    if(yourNum < machineNum){
        resultStn.innerText = 'You lost!'
    }else{
        resultStn.innerText = 'You won!'
    }
}

function getRandomNum(start, end){
    return Math.floor((Math.random() * (end-start+1)) + start);
}

function init(){
    rangeEl.addEventListener("input", setMaxValueInRange);
    playBtn.addEventListener("click", clickPlayBtn);
}

init();




