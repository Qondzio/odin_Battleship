export default function Ships(length){
    let hitCount=0;

    function hit(){
        hitCount++;
    }

    function isSunk(){
        return (length===hitCount) ? true:false;
    }

    return {length,hitCount,hit,isSunk}
}