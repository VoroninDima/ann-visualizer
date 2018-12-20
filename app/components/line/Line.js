import React from 'react'
import {connect} from 'react-redux';


function Line (props) {
    const {lineData, lineEndsOffsetTop, btnActive} = props;
    const {lineBgc} = lineData;
    const neuronProperties = lineData.neuronProperties;
    let selectedColor = lineBgc;
    let aOffsetTop = neuronProperties.neuronOffsetTop;
    let aOffsetLeft = neuronProperties.neuronOffsetLeft+50;
    let bOffsetTop = lineEndsOffsetTop-50;
    let bOffsetLeft = neuronProperties.nextNeuronOffsetLeft;
    let angle = Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI;
    let length = Math.sqrt((bOffsetLeft - aOffsetLeft) * (bOffsetLeft - aOffsetLeft) + (bOffsetTop - aOffsetTop) * (bOffsetTop - aOffsetTop));
    let width = Math.abs(length) + 'px';
    let style = {
        display: 'block',
        backgroundColor: selectedColor,
        width: width,
        transform: `rotate(${angle}deg)`
    };
    if(!btnActive) style.display = 'none';

    return <div style={style} className="line" />;
}

export default connect(
    state => ({
        btnActive: !state.btnActive
})

)(Line)