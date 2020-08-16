const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector(".toDoInput");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

let toDos = [];
let dones = [];
let toDosId = 1;

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value = '';
}

function paintPending(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    toDosId++;
    const newId = toDosId;

    span.innerText = text;
    delBtn.innerText = "❌";
    checkBtn.innerText = "✅";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = newId;
    pendingList.appendChild(li);

    const pendingObj = {
        text: text,
        id: newId
    }
    toDos.push(pendingObj);
    saveToDos();

    delBtn.addEventListener("click", deleteBtn);
    checkBtn.addEventListener("click", paintFinish);
}

function saveToDos(){
    localStorage.setItem("PENDING",JSON.stringify(toDos));
}

function saveDones(){
    localStorage.setItem("FINISHED",JSON.stringify(dones));
}

function deleteBtn(event){
    const btn = event.target;
    const li = btn.parentNode;
    const ul = li.parentNode;

    if(ul.className === 'js-pendingList'){
        pendingList.removeChild(li);
        const cleanToDos = toDos.filter((toDo) => toDo.id != li.id);
        toDos = cleanToDos;
        saveToDos();
    }else if(ul.className === 'js-finishedList'){
        finishedList.removeChild(li);
        const cleanDones = dones.filter((done) => done.id != li.id);
        dones = cleanDones;
        saveDones();
    }
    
}

function paintFinish(event){

    const btn = event.target;
    pendingList.removeChild(btn.parentNode);
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");

    span.innerText = btn.parentNode.querySelector('span').innerText
    delBtn.innerText = "❌";
    backBtn.innerText = "⏪";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = btn.parentNode.id;

    finishedList.appendChild(li);

    const cleanToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    toDos = cleanToDos;
    saveToDos();

    const finishedObj = {
        text: span.innerText,
        id: li.id
    }
    dones.push(finishedObj);
    saveDones();

    delBtn.addEventListener("click", deleteBtn);
    backBtn.addEventListener("click", backToPending);
}

function backToPending(event){

    const btn = event.target;
    finishedList.removeChild(btn.parentNode);
    const cleanDones = dones.filter((done) => done.id != btn.parentNode.id);
    dones = cleanDones;
    saveDones();
    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");

    span.innerText = btn.parentNode.querySelector('span').innerText
    delBtn.innerText = "❌";
    checkBtn.innerText = "✅";

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.id = btn.parentNode.id;

    pendingList.appendChild(li);

    const pendingObj = {
        text: span.innerText,
        id: li.id
    }
    toDos.push(pendingObj);
    saveToDos();
}

function loadToDos() {
    const loadedPending = localStorage.getItem("PENDING");
    if (loadedPending !== null) {
      const parsedPending = JSON.parse(loadedPending);
      parsedPending.forEach(function(item) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            const delBtn = document.createElement("button");
            const checkBtn = document.createElement("button");

            span.innerText = item.text;
            delBtn.innerText = "❌";
            checkBtn.innerText = "✅";

            li.appendChild(span);
            li.appendChild(delBtn);
            li.appendChild(checkBtn);
            li.id = item.id;
            pendingList.appendChild(li);

            delBtn.addEventListener("click", deleteBtn);
            checkBtn.addEventListener("click", paintFinish);
      });
    }

    const loadedFinished = localStorage.getItem("FINISHED");
    if (loadedFinished !== null) {
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(item) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            const delBtn = document.createElement("button");
            const backBtn = document.createElement("button");
    
            span.innerText = item.text;
            delBtn.innerText = "❌";
            backBtn.innerText = "⏪";
    
            li.appendChild(span);
            li.appendChild(delBtn);
            li.appendChild(backBtn);
            li.id = item.id;
            finishedList.appendChild(li);
            delBtn.addEventListener("click", deleteBtn);
            backBtn.addEventListener("click", backToPending);
        });
      }
  }

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();