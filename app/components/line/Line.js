import React from 'react'
import {connect} from 'react-redux';

/**
 * @param {{}} props
 *     @param {{lineBgc:string}} props.lineData
 *     @param {{firstLinePosition:int}}
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{firstLinePosition:int}} props
 * @returns {*}
 * @constructor
 */
  /**
 * @param {{}} props
 *     @param {{firstLineOffsetLeft:int}} props.lineData
 * @returns {*}
 * @constructor
 */
 /**
 * @param {{}} props
 *     @param {{secondLineOffsetLeft:int}} props
 * @returns {*}
 * @constructor
 */
 function Line (props) {
    let selectedColor = props.lineData.lineBgc;
    let aOffsetTop = props.firstLinePosition;
    let aOffsetLeft = props.lineData.firstLineOffsetLeft;
    let bOffsetTop = props.lineData.secondLinePosition;
    let bOffsetLeft = props.lineData.secondLineOffsetLeft;
    let angle = Math.atan2(bOffsetTop - aOffsetTop, bOffsetLeft - aOffsetLeft) * 180 / Math.PI;
    let length = Math.sqrt((bOffsetLeft - aOffsetLeft) * (bOffsetLeft - aOffsetLeft) + (bOffsetTop - aOffsetTop) * (bOffsetTop - aOffsetTop));
    let width = Math.abs(length) + 'px';
    let style = {
        display: 'block',
        backgroundColor: selectedColor,
        width: width,
        transform: `rotate(${angle}deg) scale(-1, 1)`
    };
    if(!props.btnActive) style.display = 'none';

    return <div style={style} className="line" />;
}

export default connect(
    state => ({
        btnActive: !state.btnActive
    })

)(Line)