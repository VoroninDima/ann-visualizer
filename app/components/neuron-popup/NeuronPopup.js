import React from 'react'

export function NeuronPopup(props) {
    let style;
    props.active ? style={display: 'block'} : style={display: 'none'};
    const {neuronName, activationFunction} = props;

    return (
    	<div style={style} className='popup'>
            <p className='neuronPopupParagraph'>{neuronName}</p>
            <p className='neuronPopupParagraph activationFunction'>Activation function: {activationFunction}</p>
        </div>
	)
}