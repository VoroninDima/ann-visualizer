import React from 'react'

import Line from '../line/Line.jsx'

export default function LinesList (props) {
	let lines;
    if(props.firstLinePositionArray) {

        lines = props.firstLinePositionArray.map((line, key) => <Line key={key} lineData={props} firstLinePosition = {line}/>)
	}
	return (
		<div className="lineList">
			{lines}
		</div>
	)
}