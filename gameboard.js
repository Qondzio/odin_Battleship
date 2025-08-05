import ships from './ship.js'
import { blankDiv, getSelectedLength } from './control.js';

export default function gameboard(){
    const possibleAttacks=[];
    let countedAttacks=[];
    let shipPosition=[];
    let rotate=false;
    let divsArray=[];

    function setRotate(value) {
        rotate = value;
    }

    function getRotate() {
        return rotate;
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
            for(let div of divsArray){
                shipPosition.push([[div.getAttribute('row'),div.getAttribute('column')],getSelectedLength()])
            }
            blankDiv(getSelectedLength());
        } 
    }

    function receiveAttack(x,y){
        
    }

    return {receiveAttack,setRotate,getRotate}
}
