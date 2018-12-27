import React from 'react'

import Line from 'components/line/Line'
import {connect} from "react-redux";

function LinesList (props) {
    const{neuronListLength, neuronProperties, neuronOrderNum, neuronListNum} = props;
    let lineEndsOffsetTop = [];
    let nextNeuronOffsetTop = neuronProperties.nextNeuronOffsetTop;
    let getLineEndsOffsetTop = () => {
        for (let i = 0; i < neuronListLength; i++) {
            nextNeuronOffsetTop = nextNeuronOffsetTop + props.neuronSize+props.offsetTop;
            lineEndsOffsetTop.push(nextNeuronOffsetTop)
        }
    };
    getLineEndsOffsetTop();
    let neuronNextNum = -1;
    const lines = lineEndsOffsetTop.map((line, key) => {
        neuronNextNum = neuronNextNum + 1
        return (
            <Line key={key}
              neuronNextNum={neuronNextNum}
              neuronListLength={neuronListLength}
              neuronOrderNum={neuronOrderNum}
              neuronListNum={neuronListNum}
              neuronSize={props.neuronSize}
              lineData={props}
              lineEndsOffsetTop={line}
        />);
    });
    return (
		<div style={{transform: `translateX(${props.neuronSize/2}px)`}} className="lineList">
            {lines}
		</div>
	)
}
function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize
    }
}
export default connect(mapStateToProps)(LinesList)
