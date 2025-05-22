let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ['red','green','yellow','purple'];
let highest = 0;

document.addEventListener('keypress',function(){
    if(started == false){
        started = true;
        console.log("Game Started");
    }
    levelUp();
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndex = Math.floor(Math.random()*4);
    let btnColor = btns[randIndex];
    gameSeq.push(btnColor);
    let btn = document.querySelector(`.${btnColor}`);
    gameFlash(btn);
}

function btnPress(){
    let btn = this;
    let userColor = btn.getAttribute('id');
    userFlash(btn);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function checkAns(index){
    if(userSeq[index]===gameSeq[index]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        },250);
        if(level > highest){
            highest = level;
            h2.innerHTML = `Game over! <br> <b>New highscore ${highest} <b> <br> Press any key to start the game`;
        }else{
            h2.innerHTML = `Game over ! <br> your score is <b>${level} <b> <br> Press any key to start the game`;
        }
        setTimeout(reset,1000);
    }
}

function reset(){
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
}
