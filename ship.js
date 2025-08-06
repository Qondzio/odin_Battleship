export default function ships(length){
    let hitCount=0;

    function hit(){
        hitCount++;
    }

    function isSunk(){
        return (length===hitCount) ? true:false;
    }

    function getHitCount(){
        return hitCount;
    }

    return {hit,isSunk, getHitCount}
}