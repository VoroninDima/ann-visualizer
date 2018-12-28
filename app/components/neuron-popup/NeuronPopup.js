import React from 'react'

export function NeuronPopup(props) {
    const setStyle = () => {
        const isShow = {display: 'block'};
        const isHidden = {display: 'none'};
        return props.active ? isShow : isHidden;

    };
    const {neuronName, activationFunction} = props;

    return (
    	<div style={setStyle()} className='popup'>
            <p className='neuronPopupParagraph'>{neuronName}</p>
            <p className='neuronPopupParagraph activationFunction'>Activation function: {activationFunction}</p>
        </div>
	)
}