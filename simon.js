let gameSeq=[];
let userSeq=[];
let highest=0;
let btns=["yellow","blue","green","red"];

let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress", function(){
    if(started==false){
        started=true;
        levelUp();
    }

});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },1000);
}
function levelUp(){
    userSeq=[]
    level++;
    h2.innerHTML=`Level ${level} <br> highest Score ${highest}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
        
    }
    else{
        highest = Math.max(highest, level);
        h2.innerHTML = `Game Over!! Your score was <b>${level}</b> <br> Highest Score ${highest} <br>Press any Key to start.`;

        document.querySelector("body").style.background = "red";

        setTimeout(function() {
            document.querySelector("body").style.background = "linear-gradient(145deg, #1e1e2f, #3a3a6c)";
        }, 450);

        reset();
    }
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
function btnPress(){
    let btn=this;
    btnFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}