const numBtns = document.querySelectorAll('.numBtn');
const screen = document.querySelector('.screen');
const resetBtn = document.querySelector('.resetBtn');
const calBtns = document.querySelectorAll('.calBtn');
const equalBtn = document.querySelector('.equalBtn');

function showNumberScreen(e){

    const number = e.target.innerText;

    if(screen.innerText === "0"){
        screen.innerText= "";
    }

    saveCommand(number);
    const command = getCommand();

    if(command.indexOf("*") >= 0 || command.indexOf("/") >= 0 && command.indexOf("+") < 0 && command.indexOf("-") < 0){
        clickEqualBtn();
    }else if (command.indexOf("*") < 0 && command.indexOf("/") < 0 && (command.indexOf("+") >= 0 || command.indexOf("-") >= 0)){
        screen.innerText= "";
        screen.innerText = screen.innerText + number;
    }else{
        screen.innerText = screen.innerText + number;
    }
    
}

function setOperator(e){
    const operator = e.target.innerText;
    const command = getCommand();
    const lastChar = command.charAt(command.length -1);
    saveCommand(operator);
    if(lastChar === '*' || lastChar === '/'){
        screen.innerText = eval(command);
    } 

}

function saveCommand(item){
    localStorage.setItem("command", localStorage.getItem("command")+item);
}

function getCommand(){
    return localStorage.getItem("command");
}

function resetZero(){
    screen.innerText = 0;
    localStorage.setItem("command", "");
}

function clickEqualBtn(){
    const command = getCommand();
    const result = eval(command);
    screen.innerText = result;
}

function init(){
    localStorage.setItem("command", "");
    resetBtn.addEventListener("click", resetZero);
    numBtns.forEach((item, index) => item.addEventListener("click", showNumberScreen));
    calBtns.forEach((item, index) => item.addEventListener("click", setOperator));
    equalBtn.addEventListener("click", clickEqualBtn);
}

init();