import React from 'react'

export function LinePopup(props) {
    const setStyle = () => {
        const {rotate} = props;
        const isShow = {
            display: 'flex',
            transform: `rotate(${-rotate}deg)`,
            marginLeft: props.popUpPosition
        };
        const isHidden = {
            display: 'none',
            transform: `rotate(${-rotate}deg)`
        };
        return props.active ? isShow : isHidden;

    };
    return (
        <div style={setStyle()} className='popup linePopup'>
            <p>Weights: {props.weightsValue}</p>
        </div>
    )
}