let input = document.getElementById("input");
let clearAll = document.querySelector(".clear");
let date = document.getElementById("date");
let list = document.getElementById("list");
let add = document.querySelector('.fa-plus-circle')
let time = document.getElementById('time')


const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// const TIME = "fa-clock"

let LIST, id;
let data = localStorage.getItem("TODO");


if(data){
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
} else {
    LIST = [];
    id = 0;
}


function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


clearAll.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

let curentTime = setInterval(function() {
const options = {
    weekday : "long", 
    month:"short", 
    day:"numeric",
    
};
// console.log(time)
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);
time.innerHTML = today.toLocaleTimeString();
},1000) 



function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <p class="text ${LINE}">${toDo}</p>
                    <span class=""></span>
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}


    add.addEventListener("click",function(){
        
            const toDo = input.value;
            
            if(toDo){
                addToDo(toDo, id, false, false);
                
                LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
                });
                
                localStorage.setItem("TODO", JSON.stringify(LIST));
                
                id++;
            }
            input.value = "";
        
    });

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    if(elementJob == "complete"){
        completeToDo(element);
    } 
    else if(elementJob == "delete") {
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
