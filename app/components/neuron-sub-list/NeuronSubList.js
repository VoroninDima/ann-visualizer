import React from 'react';

import Neuron from 'components/neuron/Neuron';
import {connect} from 'react-redux'

export function NeuronSubList(props) {
    const {neuronListNum,  neuronColor, subListName, subList, neuronSize, netWidth} = props;
    const {units} = subList;
    let neuronOrderNum = -1;
    let neuronMap = () => {
        return units.map((neuron, key) => {
            neuronOrderNum = neuronOrderNum + 1;
            return <Neuron
                activationFunction={neuron.ActivationFunction}
                neuronListNum={neuronListNum}
                neuronColor={neuronColor}
                neuronSize={neuronSize}
                netWidth={netWidth}
                key={key}
                neuronOrderNum={neuronOrderNum}
                neuron={neuron.name}
                listName={subListName}
            />
        });
    };

    return <div>{neuronMap()}</div>;
}
function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize,
        netWidth: state.changeSettings.netWidth,

    }
}

export default connect(mapStateToProps)(NeuronSubList)