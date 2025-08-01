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
export {getSelectedLength}

document.querySelectorAll('.selectShip').forEach(element =>[
    element.addEventListener('click', ()=>{
        selectedLength=element.querySelector('.shipPreview').childElementCount;
        document.querySelectorAll('.selectShip').forEach(item =>{
            item.classList.remove('selectedShip')
        })
        element.classList.toggle('selectedShip')
    })
])