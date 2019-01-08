import React from 'react'

export function LinePopup(props) {
    const setStyle = () => {
        const {rotate, popupPos} = props;
        const isShow = {
            display: 'block',
            marginLeft: popupPos,
            transform: `rotate(${-rotate}deg)`,
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