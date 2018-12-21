import React from 'react'
import {connect} from 'react-redux';


function Line (props) {
    const {lineData, lineEndsOffsetTop, btnActive} = props,
          {lineBgc} = lineData,
          neuronProperties = lineData.neuronProperties,
          selectedColor = lineBgc,
          aOffsetTop = neuronProperties.neuronOffsetTop,
          aOffsetLeft = neuronProperties.neuronOffsetLeft+50,
          bOffsetTop = lineEndsOffsetTop-50,
          bOffsetLeft = neuronProperties.nextNeuronOffsetLeft,
          angle = Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI,
          length = Math.sqrt((bOffsetLeft - aOffsetLeft) * (bOffsetLeft - aOffsetLeft) + (bOffsetTop - aOffsetTop) * (bOffsetTop - aOffsetTop));
    const width = Math.abs(length) + 'px';
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
        btnActive: !state.hideBtnClick.btnActive
})

)(Line)