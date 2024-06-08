const boxes = document.querySelectorAll('.box');
const boxArray = Array.from(boxes);
const player1Result = document.getElementById('player1_result');
const player2Result = document.getElementById('player2_result');
const tieMatchResult = document.getElementById('match_tie');
const playerChangeButton = document.getElementById('player_change');
const buttonIcon = document.getElementById('button_icon');
const tingAudio = document.getElementById('click_sound');
const backgroundAudio = document.getElementById('background_audio');
const volumebtn = document.getElementById('volume_icon');
let turn0 = true;

// Volume button logic
volumebtn.addEventListener('click',()=>{
    if(volumebtn.innerText == 'volume_off'){
        volumebtn.innerText = "volume_up";
        backgroundAudio.play();
    }else{
        volumebtn.innerText = "volume_off";
        backgroundAudio.pause();
    }
    
})

// Players Result Store
let player1 = 0;
let player2 = 0;
let tiematch = 0;

// Wining Conditions array
const winCondition = [
    [0,1,2],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
];

// Check the turn (O) & (X) 
const checkTurn = ()=>{
    if(turn0){
        turn0 = false;
        return 'O';
    }else{
        turn0 = true;
        return 'X';
    }
}


// Computer player logic
const checkComputerwinnerOccurance = ()=>{
    for(let pattern of winCondition){
        let box1 = boxArray[pattern[0]];
        let box2 = boxArray[pattern[1]];
        let box3 = boxArray[pattern[2]];
        let box1Val = box1.innerText;
        let box2Val = box2.innerText;
        let box3Val = box3.innerText;
        if(box1Val == "O" && box2Val == "O"){
            if(!box3.classList.contains('disabled')){
                box3.innerText = "O";
                box3.classList.add('disabled');
                return true;
            }
        }else if(box2Val == "O" && box3Val == "O"){
            if(!box1.classList.contains('disabled')){
                box1.innerText = "O";
                box1.classList.add('disabled');
                return true;
            }
        }else if(box1Val == "O" && box3Val == "O"){
            if(!box2.classList.contains('disabled')){
                box2.innerText = "O";
                box2.classList.add('disabled');
                return true;
            }
        }
    }
    return false;
}
const computerTurn = ()=>{
    if(checkComputerwinnerOccurance()){
        return;
    }
    for(let pattern of winCondition){
        let box1 = boxArray[pattern[0]];
        let box2 = boxArray[pattern[1]];
        let box3 = boxArray[pattern[2]];
        let box1Val = box1.innerText;
        let box2Val = box2.innerText;
        let box3Val = box3.innerText;
        if((box1Val != "" && box2Val != "")&&(box1Val === box2Val)){
            if(!box3.classList.contains('disabled')){
                box3.innerText = "O";
                box3.classList.add('disabled');
                return;
            }
        }else if((box2Val != "" && box3Val != "")&&(box2Val === box3Val)){
            if(!box1.classList.contains('disabled')){
                box1.innerText = "O";
                box1.classList.add('disabled');
                return;
            } 
        }else if((box1Val != "" && box3Val != "")&&(box1Val === box3Val)){
            if(!box2.classList.contains('disabled')){
                box2.innerText = "O";
                box2.classList.add('disabled');
                return;
            }
        }
    }
    // console.log("Hello");
    let a = Math.floor(Math.random()*9);
    for(let i=a;i<9;i++){
        if(!boxArray[i].classList.contains('disabled')){
            boxArray[i].innerText = "O";
            boxArray[i].classList.add('disabled');
            return;
        }
    }
    for(let i=a;i>=0;i--){
        if(!boxArray[i].classList.contains('disabled')){
            boxArray[i].innerText = "O";
            boxArray[i].classList.add('disabled');
            return;
        }
    }
}


// Check the winner
const checkWinner = ()=>{
    for(let pattern of winCondition){
        let box1Val = boxArray[pattern[0]].innerText;
        let box2Val = boxArray[pattern[1]].innerText;
        let box3Val = boxArray[pattern[2]].innerText;
        
        if(box1Val != "" && box2Val != "" && box3Val != ""){
            if(box1Val === box2Val && box2Val === box3Val){
                if(box1Val == 'X'){
                    player1++;
                }else if(box1Val == "O"){
                    player2++;
                }
                return true;
            }
        }
    }
    return false;
}


// update the score
const updateValueFunc = ()=>{
    player1Result.innerText = player1;
    player2Result.innerText = player2;
    tieMatchResult.innerText = tiematch;
    setTimeout(()=>{
        boxArray.forEach(box=>{
            box.innerText = "";
            box.classList.remove('disabled');
        })
    },1000);
}

//check the match is tie or not
const checkTieMatch = ()=>{
    for(let i=0;i<9;i++){
        if(!boxArray[i].classList.contains('disabled')){
            return;
        }
    }
    tiematch++;
    updateValueFunc();
}

// match between player or computer
playerChangeButton.addEventListener('click',()=>{
    const playerName = document.getElementById('player_exchange');
    if(buttonIcon.innerText == "person"){
        playerName.innerText = "COMPUTER (O)"
        buttonIcon.innerText = "group";
    }else{
        buttonIcon.innerText = 'person';
        playerName.innerText = "PLAYER (O)"
    }
    player1 = 0;
    player2 = 0;
    tiematch = 0;
    updateValueFunc();
})

// Click event for playing the game
boxArray.forEach(box=>{
    box.addEventListener('click',()=>{
        if(buttonIcon.innerText == "group"){
            box.innerHTML = "X";
            tingAudio.play();
            box.classList.add('disabled');
            let winner = checkWinner();
            if(winner){
                updateValueFunc();
                return;
            }
            setTimeout(()=>{
                computerTurn();
                tingAudio.play();
                winner = checkWinner();
                if(winner){
                    updateValueFunc();
                }else{
                    checkTieMatch();
                }
            },400)
        }else{
            box.innerHTML = checkTurn();
            tingAudio.play();
            box.classList.add('disabled');
            let winner = checkWinner();
            if(winner) updateValueFunc();
            else checkTieMatch();
        }
        
    })
})