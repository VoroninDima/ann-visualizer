import React from 'react'

import Line from 'components/line/Line'
import {connect} from "react-redux";

function LinesList (props) {
    const {
        neuronListLength,
        isActive,
        listName,
        getNextListName,
        neuronProperties,
        neuronOrderNum,
        neuronListNum,
        neuronSize,
        offsetTop
    } = props;

    let getLineEndsOffsetTop = () => {
        let lineEndsOffsetTop = [];
        let nextNeuronOffsetTop = neuronProperties.nextNeuronOffsetTop-10;
        for (let i = 0; i < neuronListLength; i++) {
            nextNeuronOffsetTop = nextNeuronOffsetTop + neuronSize+offsetTop+10;
            lineEndsOffsetTop.push(nextNeuronOffsetTop)
        }
        return lineEndsOffsetTop
    };

    let neuronNextNum = -1;

    const lines = getLineEndsOffsetTop().map((line, key) => {
        neuronNextNum = neuronNextNum + 1;
        return (
            <Line key={key}
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

    const style = {marginLeft: neuronSize+12, marginTop: neuronSize/2};

    return <div className={'linesList'} style={style}>{lines}</div>
}


function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize
    }
}

export default connect(mapStateToProps)(LinesList)
