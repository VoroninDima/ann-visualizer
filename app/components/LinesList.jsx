import React from 'react'
import Line from './Line.jsx'

export default function LinesList (props) {
	let aOffsetLeft = props.aOffsetLeft
	const ar = props.ar
	const line = ar.map((top) => <Line positionCenter={props.positionCenter} aOffsetLeft={aOffsetLeft} inputNum={props.inputNum} hiddenNum={props.hiddenNum} linesHeight={top.linesHeight} linesTranslate={top.linesTop}/>)
	return (
		<div>{line}</div>
	)
		
}