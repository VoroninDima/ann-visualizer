import React from 'react'

import Line from '../line/Line.jsx'


export default function LinesList (props) {
	let lineMarginTop = props.size/2
	let lines
	if(props.inpPosition) {
		lines = props.inpPosition.map((top, key) =>
			<Line key={key} position={top} hidPosition={props.hidPosition}/>
		);
	}
	if(props.outPosition) {
		lines = props.outPosition.map((top, key) =>
			<Line key={key} as={1} position={top} hidPosition={props.hidPosition}/>
		);
	}


	return <div className="lineList">{lines}</div>;
}