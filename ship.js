export default function ships(length){
    let hitCount=0;
    const shiplength=length;
    const shipPosition=[];

    function hit(position){
        hitCount++;

        (function addPosition(){
            shipPosition.push(position);
        })()
    }

    function getHitCount(){
        return hitCount;
    }

    function isSunk(){
        return (shiplength===getHitCount()) ? true:false;
    }

    function getShipPosition(){
        return shipPosition;
    }
    

    return {hit,isSunk, getHitCount, getShipPosition}
}