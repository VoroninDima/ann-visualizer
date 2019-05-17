import React from 'react'
import {connect} from "react-redux";

import Line from 'components/line/Line'

import LinesListConfig from 'configs/components/linesList'
import NeuronConfig from 'configs/components/neuron'

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
        offsetTop,
        weights
    } = props;

    let getLineEndsOffsetTop = () => {
        const {nextOffsetTop} = LinesListConfig;
        let lineEndsOffsetTop = [];
        let nextNeuronOffsetTop = neuronProperties.nextNeuronOffsetTop-nextOffsetTop;
        for (let i = 0; i < neuronListLength; i++) {
            nextNeuronOffsetTop = nextNeuronOffsetTop + neuronSize+offsetTop+nextOffsetTop;
            lineEndsOffsetTop.push(nextNeuronOffsetTop)
        }
        return lineEndsOffsetTop
    };

    let neuronNextNum = -1;

    const lines = getLineEndsOffsetTop().map((line, key) => {
        neuronNextNum = neuronNextNum + 1;
        return (
            <Line key={key}
              weights={weights}
              isActive={isActive}
              getNextListName={getNextListName}
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
    const {borderSize} = NeuronConfig;

    const style = {
        marginLeft: neuronSize+borderSize,
        marginTop: neuronSize/2
    };

    return <div className={'linesList'} style={style}>{lines}</div>
}


function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize
    }
}

export default connect(mapStateToProps)(LinesList)
