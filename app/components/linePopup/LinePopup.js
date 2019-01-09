import React from 'react'

export function LinePopup(props) {
    const setStyle = () => {
        const {rotate, popupPos} = props;
        const isShow = {
            display: 'block',
            marginLeft: popupPos-50,
            transform: `rotate(${-rotate}deg)`,
        };
        const isHidden = {
            display: 'none',
        };
        return props.active ? isShow : isHidden;

    };
    return (
        <div style={setStyle()} className='popup linePopup'>
            <p>Weights: {props.weightsValue}</p>
        </div>
    )
}