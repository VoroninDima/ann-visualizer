import React from 'react'
let test2 = 0
let test = 0
let koef1 = 120
export default function Line (props) {
	let linesTranslate = props.positionCenter
	const inputNum = props.inputNum
    let hiddenNum = props.hiddenNum
	const linesHeight = props.linesHeight
	if (test == hiddenNum) {
		koef1 = koef1 + 120
		test = 0
	}

	if (test2 == inputNum*props.hiddenNum) {
		koef1 = 120
	}

	if (test < hiddenNum) {
		linesTranslate = linesTranslate + koef1
	}

	if(test2 > inputNum*props.hiddenNum){
		linesTranslate = props.positionCenter + koef1
	}

	test = test + 1
	test2 = test2 + 1


	let bOffsetLeft = 540
    let bOffsetTop = linesHeight*1.2
    let aOffsetTop = linesTranslate
    let aOffsetLeft = props.aOffsetLeft
    let angle= Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI;
    let length = Math.sqrt((bOffsetLeft-aOffsetLeft) * (bOffsetLeft-aOffsetLeft) + (bOffsetTop-aOffsetTop) * (bOffsetTop-aOffsetTop));
	length = Math.round(length)
	angle=Math.round(angle)
    let width = Math.abs(length)+'px';

	const style = {
		width: width,
		transform: `rotate(${angle}deg)`
	}
	return (
		<div style={style} className="line"></div>
	)
		
}