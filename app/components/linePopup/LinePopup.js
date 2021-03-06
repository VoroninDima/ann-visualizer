import React from 'react'

import LineConfig from 'configs/components/linePopUp'

export function LinePopup(props) {
    const setStyle = () => {
        const {rotate, popupPos} = props;
        const {popupPosCenter} = LineConfig;

        const isShow = {
            display: 'block',
            marginLeft: popupPos-popupPosCenter,
            transform: `rotate(${-rotate}deg)`,
        };

        const isHidden = {
            display: 'none',
        };

        return props.active ? isShow : isHidden;

    };

    const weightValue = props.weightsValue.toFixed(6);

    return (
        <div style={setStyle()} className='popup linePopup'>
            <p>Weights: {weightValue}</p>
        </div>
    )
}