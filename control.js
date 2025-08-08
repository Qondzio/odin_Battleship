
import gameboard from "./gameboard.js";

const game=gameboard()
//Change rotation while placing ships
document.getElementById('rotate').addEventListener('click', ()=>{
    (game.getRotate()===false)? game.setRotate(true):game.setRotate(false);
})
//Select length of places ships
let selectedLength=5;

function getSelectedLength(){
    return selectedLength;
}
document.querySelectorAll('.selectShip').forEach(element =>[
    element.addEventListener('click', ()=>{
        selectedLength=element.querySelector('.shipPreview').childElementCount;
        document.querySelectorAll('.selectShip').forEach(item =>{
            item.classList.remove('selectedShip')
            
        })
        element.classList.toggle('selectedShip')
    })
])


//Make a div 'blank' and unable to choose once a ship has been placed
const selectedLengths=[];
function blankDiv(shipLength){
    document.querySelectorAll('.selectShip').forEach(div =>{
        if(div.querySelector('.shipPreview').childElementCount === shipLength){
            div.classList.remove('selectedShip')
            div.classList.add('disabledDiv');
            selectedLengths.push(getSelectedLength());
            for(let x=5; x>0;x--){
                if(selectedLengths.includes(x) === false){
                    selectedLength=x;
                    break;
                }
            }                      
        }
    })
    document.querySelectorAll('.selectShip').forEach(div =>{
        if(div.querySelector('.shipPreview').childElementCount === selectedLength && div.classList.contains('disabledDiv') === false){
            div.classList.add('selectedShip');
        }
    })

    if(selectedLengths.length === 5){
        document.querySelectorAll('.row').forEach(div =>{
            div.classList.toggle('disabledRow')
        })
        document.getElementById('rotate').classList.toggle('disabledDiv')
        document.getElementById('start').style.backgroundColor='rgba(47, 223, 47, 0.72)';
        document.getElementById('start').style.border='1px solid rgba(47, 223, 47, 0.72)';
        
    }
}


//Allows to start a game only if player has placed all of his ships
document.getElementById('start').addEventListener('click', ()=>{
    if(selectedLengths.length === 5){
        startGame();
    }
})


function startGame(){

    (function prepareGameGui(){
        document.querySelector('.choose').style.display='none';
        document.querySelector('.computerGameboard').style.display='grid';
        document.querySelector('.info').style.display='block';
        document.querySelector('.gameInfo').textContent=`Your turn! Click on computer's board to attack`;
        document.querySelectorAll('.boardInfo').forEach(div =>{
            div.style.display='block';
        });

        for(let i=1;i<=10;i++){
            for(let j=1;j<=10;j++){
                const div=document.createElement('div');
                div.classList.add('row');
                div.setAttribute('row',i);
                div.setAttribute('column',j);
                document.querySelector('.computerGameboard').appendChild(div);

                div.addEventListener('click', ()=>{
                    game.receiveAttack(parseInt(div.getAttribute('row')), parseInt(div.getAttribute('column')), game.getcomputerShipPosition(), 'computerGameboard');
                    if(endGame !== 1) computerMove();
                })
            }
        }
        game.generateComputerPosition();
    })()
}

//Create a possible moves for computer
const computerPossibleMoves=[];
for(let i=1;i<=10;i++){
    for(let j=1; j<=10; j++){
        computerPossibleMoves.push([i,j]);
    }
}

async function computerMove(){
    document.querySelector('.computerGameboard').style.pointerEvents = 'none';
    document.querySelector('.gameInfo').textContent=`Computer's turn...`;
    function delay(){
        return new Promise(resolve => setTimeout(resolve,700))
    }
    await delay();
    document.querySelector('.computerGameboard').style.pointerEvents = 'auto';
    document.querySelector('.gameInfo').textContent=`Your turn! Click on computer's board to attack`;

    const index=Math.floor(Math.random()*computerPossibleMoves.length);
    const move=computerPossibleMoves[index];
    
    game.receiveAttack(move[0],move[1],game.getplayerShipPosition(), 'playerGameboard');
    computerPossibleMoves.splice(index,1);
}

let endGame=0;
function winGame(player){
    endGame=1;
    document.querySelector('.computerGameboard').style.pointerEvents = 'none';
    if(player === 'player'){
        document.querySelector('.gameInfo').textContent='YOU HAVE WON 🎉🎉🎉';
    }
    else{
        document.querySelector('.gameInfo').textContent='COMPUTER HAS WON 💀💀💀';
    }
    
}

export {getSelectedLength, blankDiv, winGame}
