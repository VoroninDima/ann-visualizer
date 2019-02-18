import React from 'react';
import {connect} from 'react-redux'

import Neuron from 'components/neuron/Neuron';

export function NeuronSubList(props) {
    const {neuronListNum,  neuronColor, subListName, subList, neuronSize, netWidth} = props;

    let neuronOrderNum = -1;
    let neuronMap = () => {
        return subList.units.map((neuron, key) => {
            const {name, ActivationFunction} = neuron;

            neuronOrderNum = neuronOrderNum + 1;

            return <Neuron
                activationFunction={ActivationFunction}
                neuronListNum={neuronListNum}
                neuronColor={neuronColor}
                neuronSize={neuronSize}
                netWidth={netWidth}
                key={key}
                neuronOrderNum={neuronOrderNum}
                neuron={name}
                listName={subListName}/>
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