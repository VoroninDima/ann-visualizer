let line = () => {
    let input=document.querySelectorAll('.input');
    let hidden=document.querySelectorAll('.hidden');
    let last = 0
    let body = document.querySelector('body')
    console.log(input)
    console.log(hidden)
    for(let i = 0; i < input.length; i++){
        for(let n = 0; n < hidden.length; n++){
        body.innerHTML += '<div class="line"></div>'
        let lines = document.querySelectorAll('.line')
        let m = lines.length-1
        let s = lines[m]
                console.log(input[i].offsetTop)

        s.style.left=input[i].offsetLeft+5+'px';
        s.style.top=input[i].offsetTop+5+'px';

        let angle= Math.atan2(hidden[n].offsetTop - input[i].offsetTop, hidden[n].offsetLeft - input[i].offsetLeft) * 180 / Math.PI;
        let length = Math.sqrt((hidden[n].offsetLeft-input[i].offsetLeft) * (hidden[n].offsetLeft-input[i].offsetLeft) + (hidden[n].offsetTop-input[i].offsetTop) * (hidden[n].offsetTop-input[i].offsetTop));
        s.style.width=Math.abs(length)+'px';

         
           s.style.transform="rotate("+Math.round(angle)+"deg)";
           s.style.transformOrigin ="0 0"; 
             
    }
    }
}
export default line;
let aOffsetTop = props.hidPosition.top
let aOffsetLeft = props.hidPosition.left
let bOffsetTop = props.position.top
let bOffsetLeft = props.position.left
let angle= Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI;
let length = Math.sqrt((bOffsetLeft-aOffsetLeft) * (bOffsetLeft-aOffsetLeft) + (bOffsetTop-aOffsetTop) * (bOffsetTop-aOffsetTop));
length = Math.round(length)
angle = Math.round(angle)
let width = Math.abs(length)+'px';
let style = {
    backgroundColor: props.lineColor,
    width: width,
    transform: `rotate(${angle}deg)`
}