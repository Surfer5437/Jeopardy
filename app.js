
let totalMade = 0;
const startGame = document.getElementById('startGame');
async function newGame(){
let randomCatId = Math.floor(Math.random()*100)
const gameArray = [];
for (let i = 0; i < 6; i++) {
    let diff1={};
let diff2={};
let diff3={};
let diff4={};
let diff5={};
let subArray = [];
randomCatId++;

const catList = await axios.get(`http://jservice.io/api/category?id=${randomCatId}`);
for (const question of catList.data.clues) {
    switch (question.value) {
        case 100:
            diff1 = question;
            break;
        case 200:
            diff2 = question;
            break;
        case 300:
            diff3 = question;
            break;
        case 400:
            diff4 = question;
            break;
        case 500:
            diff5 = question;
            break;
        
        default:
            break;
    }
}
subArray['title']=String(catList.data.title).toUpperCase();
subArray['0']=diff1;
subArray['1']=diff2;
subArray['2']=diff3;
subArray['3']=diff4;
subArray['4']=diff5;
gameArray.push(subArray)
}

const board = document.getElementById('board');
const newRow = document.createElement('div');
const newTitle = document.createElement('p');
newRow.classList.add('row');
newTitle.classList.add('text-center')
newTitle.style.fontSize="5vw"
newTitle.classList.add('col-12');
    newTitle.innerText='Jeopardy!';
for (let j = 0; j < gameArray.length; j++) {
    const row = gameArray[j];
    const newCol = document.createElement('div');
    newCol.classList.add('col-2');
    newCol.style.paddingTop='20px';
    newCol.style.paddingBottom='20px';
    newCol.classList.add('text-center');
    newCol.classList.add('border');
    newCol.classList.add('section-box');
    newCol.classList.add('border-danger');
    newCol.innerText = row.title;
    newRow.append(newCol);
    board.append(newTitle);
board.append(newRow);
}

for (let i = 0; i < 5; i++) {
    const newRow2 = document.createElement('div');
    newRow2.classList.add('row');
    for (let index = 0; index < 6; index++) {   
    const newCol2 = document.createElement('div');
    newCol2.classList.add('col-2');
    newCol2.style.paddingTop='50px';
    newCol2.style.paddingBottom='50px';
    newCol2.classList.add('text-center');
    newCol2.classList.add('border');
    newCol2.classList.add('section-box');
    newCol2.classList.add('border-info');
    newCol2.innerText = gameArray[index][i].value;
    newCol2.id=`${index}${i}`;
    newRow2.append(newCol2);
    }
    board.append(newRow2);
}

board.addEventListener('click', function(e){
    if (e.target.id.length == '2'){
    const clicked=document.getElementById(`${e.target.id[0]}${e.target.id[1]}`);
    if (e.target.innerText === gameArray[e.target.id[0]][e.target.id[1]].question){
        
        clicked.innerText=gameArray[e.target.id[0]][e.target.id[1]].answer;
        return;
    }
    
    
    else if (e.target.innerText === gameArray[e.target.id[0]][e.target.id[1]].answer){
        clicked.innerText='Did You get it right?';
    const newBtnCorrect = document.createElement('button');
    const newBtnWrong = document.createElement('button');
    newBtnCorrect.classList.add('btn-primary');
    newBtnWrong.classList.add('btn-danger');
    newBtnCorrect.classList.add('btn-md');
    newBtnWrong.classList.add('btn-md');
    newBtnCorrect.innerText='YES!!!';
    newBtnWrong.innerText='NOPE..';
    const newBtnGroup = document.createElement('div');
    newBtnGroup.classList.add('btn-group')
    newBtnGroup.append(newBtnCorrect)
    newBtnGroup.append(newBtnWrong)
    e.target.append(newBtnGroup)
    newBtnCorrect.addEventListener('click', function(){
        const profit = gameArray[this.parentElement.parentElement.id[0]][this.parentElement.parentElement.id[1]].value;
        const madeMoney = document.getElementById('moneyMade')
        totalMade+=profit;
        madeMoney.innerText=`You have made \$${totalMade}!!!`
        newBtnGroup.remove();
        clicked.innerText='CORRECT!';
    })
    newBtnWrong.addEventListener('click', function(){
        newBtnGroup.remove();
        clicked.innerText='YOU SUCK, again..';
    })
    return;
}
    else if (e.target.innerText == gameArray[e.target.id[0]][e.target.id[1]].value){
        clicked.innerText=gameArray[e.target.id[0]][e.target.id[1]].question;
        return;
    }
}
})

startGame.disabled=false;
}
startGame.addEventListener('click', function(){
    const checkBoard = document.getElementById('board').querySelector("div");

if (checkBoard !== null) {
    startGame.disabled=true;
    board.innerHTML="";
    newGame();
}
else if (checkBoard === null) {
startGame.disabled=true;
newGame();
}
})