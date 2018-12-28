import React from 'react';

import Neuron from 'components/neuron/Neuron';
import {connect} from 'react-redux'

export function NeuronSubList(props) {
    const {neuronListNum,  neuronColor, subListName, subList, neuronSize} = props;
    const {num, ActivationFunction} = subList;

    let neuronOrderNum = -1;
    let neuronMap = array => {
        return array.map((neuron, key) => {
            neuronOrderNum = neuronOrderNum + 1;
            return <Neuron
                activationFunction={ActivationFunction}
                neuronListNum={neuronListNum}
                neuronColor={neuronColor}
                neuronSize={neuronSize}
                netWidth={props.netWidth}
                key={key}
                neuronOrderNum={neuronOrderNum}
                neuron={neuron}
                listName={subListName}
            />
        });
    };
	let renderSubList = () => {
    	if (subList.names) {
    	    return neuronMap(subList.names);
        }
    	else {
    		let neuronsNameArray = [];
    		for (let i = 0; i < num; i++) {
    			neuronsNameArray.push(subListName)
    		}
            return neuronMap(neuronsNameArray)
    	}
    };

    return <div>{renderSubList()}</div>;
}
function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize,
        netWidth: state.changeSettings.netWidth,

    }
}

export default connect(mapStateToProps)(NeuronSubList)