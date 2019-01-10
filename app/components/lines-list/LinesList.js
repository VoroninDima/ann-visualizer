import React from 'react'

import Line from 'components/line/Line'
import {connect} from "react-redux";

function LinesList (props) {
    const {
        neuronListLength,
        zIndex,
        isActive,
        listName,
        getNextListName,
        neuronProperties,
        neuronOrderNum,
        neuronListNum,
        neuronSize,
        offsetTop
    } = props;

    let lineEndsOffsetTop = [];

    let nextNeuronOffsetTop = neuronProperties.nextNeuronOffsetTop-10;

    let getLineEndsOffsetTop = () => {
        for (let i = 0; i < neuronListLength; i++) {
            nextNeuronOffsetTop = nextNeuronOffsetTop + neuronSize+offsetTop+10;
            lineEndsOffsetTop.push(nextNeuronOffsetTop)
        }
    };
    getLineEndsOffsetTop();

    let neuronNextNum = -1;

    const lines = lineEndsOffsetTop.map((line, key) => {
        neuronNextNum = neuronNextNum + 1;
        return (
            <Line key={key}
              zIndex={zIndex}
              isActive={isActive}
              getNextListName={getNextListName()}
              neuronNextNum={neuronNextNum}
              neuronListLength={neuronListLength}
              neuronOrderNum={neuronOrderNum}
              neuronListNum={neuronListNum}
              neuronSize={neuronSize}
              lineData={props}
              lineEndsOffsetTop={line}
              listName={listName}
        />);
    });

    const setStyle = () => {
        const translate = neuronSize / 2+6;
        const transform = `translateX(${translate}px)`;
        return {transform, zIndex}
    };

    return (
		<div style={setStyle()} className="lineList">
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
