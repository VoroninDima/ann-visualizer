import React from 'react'

export function LinePopup(props) {
    let style;
    props.active ? style={display: 'flex', transform: `rotate(${-props.rotate}deg)`} : style={display: 'none', transform: `rotate(${-props.rotate}deg)`};
    return (
        <div style={style} className='popup linePopup'>
            <p>Weights: {props.weightsValue}</p>
        </div>
    )
}