import React from 'react'

export default function Line (props) {
    let selectedColor = props.lineData.lineBgc;
    let aOffsetTop = props.firstLinePosition;
    let aOffsetLeft = props.lineData.firstLineOffsetLeft;
    let bOffsetTop = props.lineData.secondLinePosition;
    let bOffsetLeft = props.lineData.secondLineOffsetLeft;
    let angle = Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI;
    let length = Math.sqrt((bOffsetLeft - aOffsetLeft) * (bOffsetLeft - aOffsetLeft) + (bOffsetTop - aOffsetTop) * (bOffsetTop - aOffsetTop));
    let width = Math.abs(length) + 'px';
    let style = {
        backgroundColor: selectedColor,
        width: width,
        transform: `rotate(${angle}deg) scale(-1, 1)`
    };

    return (
        <div style={style} className="line"></div>
    )

}