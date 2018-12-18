import React from 'react'

export default function NeuronPopup(props) {
    let style;
    props.active ? style={display: 'block'} : style={display: 'none'};


    return (
    	<div style={style} className='popup'>
            <p>{props.neuronName}</p>
        </div>
	)



}