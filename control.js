import gameboard from "./gameboard.js";

const game=gameboard()

//Change rotation while placing ships
document.getElementById('rotate').addEventListener('click', ()=>{
    (game.getRotate()===false)? game.setRotate(true):game.setRotate(false);
})