import React from 'react'
/**
 * @param {{}} props
 *     @param {{neuronName:string}} props
 * @returns {*}
 * @constructor
 */
export function NeuronPopup(props) {
    let style;
    props.active ? style={display: 'flex'} : style={display: 'none'};


    return (
    	<div style={style} className='popup'>
            <p>{props.neuronName}</p>
        </div>
	)



}