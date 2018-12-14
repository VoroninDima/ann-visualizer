import React from 'react'

export default function Line (props) {
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
		width: width,
		transform: `rotate(${angle}deg)`
	}
	return (
		<div style={style} className="line"></div>
	)
		
}