import React from 'react'

import Line from '../line/Line.jsx'


export default function LinesList (props) {

	let lines
	let style
	if(props.hidPositionArrayForInp) {
		lines = props.hidPositionArrayForInp.map((top, key) =>
			<Line lineColor={props.lineColor} key={key} position={top} hidPosition={props.inpPosition}/>
		);
		style = {
			transform: `translateX(${props.size}px)`
		}
	}
	if(props.hidPositionArrayForOut) {
		lines = props.hidPositionArrayForOut.map((top, key) =>
			<Line lineColor={props.lineColor} key={key} position={top} hidPosition={props.outPosition}/>
		);
	}



	return <div style={style} className="lineList">{lines}</div>;
}