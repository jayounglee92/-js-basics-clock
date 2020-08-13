const numBtns = document.querySelectorAll('.numBtn');
const screen = document.querySelector('.screen');
const resetBtn = document.querySelector('.resetBtn');
const calBtns = document.querySelectorAll('.calBtns');

function showNumberScreen(e){
    const number = e.target.innerText;
    screen.innerText = number;
    saveCommand(number);
}

function setOperator(){

}

function saveCommand(item){
    localStorage.setItem("command", localStorage.getItem("command")+item);
}

function resetZero(){
    screen.innerText = 0;
}

function init(){
    localStorage.setItem("command","");
    resetBtn.addEventListener("click", resetZero);
    numBtns.forEach((item, index) => item.addEventListener("click", showNumberScreen))
    calBtns.forEach((item, index) => item.addEventListener("click", setOperator))
}

init();