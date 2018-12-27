import React from 'react'

export function NeuronPopup(props) {
    let style;
    props.active ? style={display: 'flex'} : style={display: 'none'};


    return (
    	<div style={style} className='popup'>
            <p className='neuronPopupParagraph'>{props.neuronName}</p>
        </div>
	)
}