import { blankDiv, getSelectedLength, winGame } from './control.js';
import ships from './ship.js'

export default function gameboard(){
    let possibleAttacks=[];
    let countedAttacks=[];
    let playerShipPosition=[];
    let computerShipPosition=[];
    let rotate=false;
    let divsArray=[];

    function setRotate(value) {
        rotate = value;
    }

    function getRotate() {
        return rotate;
    }

    function getcomputerShipPosition(){
        return computerShipPosition;
    }

    function getplayerShipPosition(){
        return playerShipPosition;
    }

    (function fillBoard(){
        const playerBoard=document.querySelector(".playerGameboard");
        
        for(let i=1;i<=10;i++){
            for(let j=1;j<=10;j++){
                possibleAttacks.push([i,j]);
                const div=document.createElement('div');
                div.classList.add('row');
                div.setAttribute('row',i);
                div.setAttribute('column',j);
                
                div.addEventListener('mouseover', ()=>{
                    showAdjacent(div, true)
                })

                div.addEventListener('mouseout', ()=>{
                    showAdjacent(div, false)
                })

                div.addEventListener('click', ()=>{
                    placeShip(div)
                    
                })
                playerBoard.appendChild(div);
            }
        }
    })()

    function showAdjacent(div, isMOuseOver){
        divsArray=[];
        const selectedLength=getSelectedLength();
        for(let x=0;x<=selectedLength-1;x++){
            let columnId;
            let rowId;
            if(rotate===false){
                columnId=parseInt(div.getAttribute('column'))+x;
                rowId=parseInt(div.getAttribute('row'));
            }
            else if(rotate===true){
                columnId=parseInt(div.getAttribute('column'));
                rowId=parseInt(div.getAttribute('row'))+x;
            }
            const adjacentDiv=document.querySelector(`.row[row="${rowId}"][column="${columnId}"]`);
            if(adjacentDiv){
                if(adjacentDiv.getAttribute('selected') !== '1'){
                    adjacentDiv.classList.toggle('selected');
                    divsArray.push(adjacentDiv);
                }
                else if(div.getAttribute('selected') === '1' || adjacentDiv.getAttribute('selected') === '1'){
                    const badDivsArray=[];
                    for(let x=0; x<=getSelectedLength()-1; x++){
                            let columnId;
                            let rowId;
                            if(rotate===false){
                                columnId=parseInt(div.getAttribute('column'))+x;
                                rowId=parseInt(div.getAttribute('row'));
                            }
                            else if(rotate===true){
                                columnId=parseInt(div.getAttribute('column'));
                                rowId=parseInt(div.getAttribute('row'))+x;
                            }
                            const badDivs=document.querySelector(`.row[row="${rowId}"][column="${columnId}"]`);
                            badDivsArray.push(badDivs);
                        }
                    if(isMOuseOver === true){
                        for(let x of badDivsArray){
                            if(x)
                            x.classList.add('badSelect')
                        }
                    }
                    else{
                        for(let item of badDivsArray){
                            item.classList.remove('badSelect')
                        }
                    }
                    return
                }
            }
            else{
                for(let item of divsArray){
                    item.classList.toggle('badSelect');
                }
                return
            }
        }

    }

    function placeShip(clickedDiv){
        if(getSelectedLength() === divsArray.length){
            divsArray.forEach(element =>{
            const div=document.querySelector(`.row[row="${element.getAttribute('row')}"][column="${element.getAttribute('column')}"]`);
            div.setAttribute('selected',1);
            })
            clickedDiv.setAttribute('selected',1);
            const ship=ships(getSelectedLength());
            for(let div of divsArray){
                playerShipPosition.push({
                    position: [parseInt(div.getAttribute('row')),parseInt(div.getAttribute('column'))],
                    ship: ship
                })
            }
            blankDiv(getSelectedLength());            
        } 
    }

    function generateComputerPosition(){
        const shipLenghts=[5,4,3,2,1];

        shipLenghts.forEach(item =>{
            generatePosition(item);
        })

        function generatePosition(length){
            const computerRow=Math.floor(Math.random()*10)+1;
            const computerColumn=Math.floor(Math.random()*10)+1;
            const computerRotate=Math.random() > 0.5;
            
            
            if(computerRotate === false){
                if(computerColumn+length<=11){
                    isShipPlaced(computerRow, computerColumn, false, length)
                }
                else if(computerRow+length<=11){
                    isShipPlaced(computerRow, computerColumn, true, length)
                }
                else{
                    generatePosition(length);
                    return
                }
            }
            else{
                if(computerRow+length<=11){
                    isShipPlaced(computerRow, computerColumn, true, length)
                }
                else if(computerColumn+length<=11){
                    isShipPlaced(computerRow, computerColumn, false, length)
                }
                else{
                    generatePosition(length);
                    return
                }
            }
        }

        function isShipPlaced(computerRow, computerColumn, computerRotate, length){
            let generatedPosition=[];
            const ship=ships(length);
            for(let x=0;x<length;x++){
                if(computerRotate === false){
                    if(computerShipPosition.some(item =>{
                        return item.position[0] === computerRow && item.position[1] === computerColumn+x;
                    })){
                        generatePosition(length)
                        return
                    }
                    else{
                        generatedPosition.push({
                            position: [computerRow,computerColumn+x],
                            ship: ship
                        })
                    }
                }
                else{
                    if(computerShipPosition.some(item =>{
                        return item.position[0] === computerRow+x && item.position[1] === computerColumn
                    })){
                        generatePosition(length)
                        return
                    }
                    else{
                        generatedPosition.push({
                            position: [computerRow+x,computerColumn],
                            ship: ship
                        })
                    }
                }
            }
            
            generatedPosition.forEach(item =>{
                computerShipPosition.push(item);
            })

        }
    }
    
    function receiveAttack(x,y,board,player){
        let arrayIndex;
        let hit;
        let matchedDiv=document.querySelector(`.${player} .row[row='${x}'][column='${y}']`);
        if(board.some((item,index) =>{
            if(item.position[0] === x && item.position[1] === y){
                arrayIndex=index;
                hit=item;
                return true;
            }
        })){
            hit.ship.hit([x,y]);
            matchedDiv.style.backgroundColor='red';
            if(hit.ship.isSunk()){
                hit.ship.getShipPosition().forEach(position =>{
                    const div=document.querySelector(`.${player} .row[row='${position[0]}'][column='${position[1]}']`);
                    div.style.backgroundColor='rgba(83, 7, 7, 0.91)';
                    div.classList.toggle('shipDestroyed');
                    const p=document.createElement('p');
                    p.textContent='🔥';
                    p.classList.add('emoji')
                    div.appendChild(p);
                })
            }
            board.splice(arrayIndex,1);
            matchedDiv.classList.toggle('missed');
            if(board.length === 0){
                player === 'computerGameboard' ? winGame('player') : winGame('computer');
            }
        }
        else{
            matchedDiv.style.backgroundColor='rgb(252, 235, 3)';
            matchedDiv.classList.toggle('missed');
        }
        
    }

    return {receiveAttack,setRotate,getRotate, generateComputerPosition, getcomputerShipPosition, getplayerShipPosition}
}