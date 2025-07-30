import ships from './ship.js'

export default function gameboard(){
    const possibleAttacks=[];
    let countedAttacks=[];
    const shipPosition=[];

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
                    showAdjacent(div)
                })

                div.addEventListener('mouseout', ()=>{
                    showAdjacent(div)
                })
                playerBoard.appendChild(div);
            }
        }
    })()

    function showAdjacent(div){
        let divsArray=[];
        for(let x=1;x<5;x++){
            
            const columnId=parseInt(div.getAttribute('column'))+x;
            const rowId=parseInt(div.getAttribute('row'));
            const adjacentDiv=document.querySelector(`.row[row="${rowId}"][column="${columnId}"]`);
            if(adjacentDiv){
                divsArray.push(adjacentDiv);
                adjacentDiv.classList.toggle('selected')
            }
            else{
                for(let item of divsArray){
                    const div2=item;
                    div2.classList.toggle('badSelect')
                }
                div.classList.toggle('badSelect')
                return
            }
        }
        div.classList.toggle('selected')
    }

    function receiveAttack(x,y){
        
    }

    return {receiveAttack}
}
