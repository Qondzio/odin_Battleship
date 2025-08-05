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
    console.log(shipLength);
    
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
        document.getElementById('start').style.backgroundColor='rgba(21, 190, 21, 0.72)';
        document.getElementById('start').style.border='1px solid rgba(21, 190, 21, 0.72)';
    }
}

export {getSelectedLength, blankDiv}