import React from 'react';

import Neuron from 'components/neuron/Neuron';
import {connect} from 'react-redux'
import actionAddNeuronsNames from "../../actions/actionAddNeuronsNames";

export function NeuronSubList(props) {
    const {neuronListNum,  neuronColor, subListName, subList} = props;
    const {num} = subList;
    let neurons;
    const neuronSize = props.neuronSize;
    let neuronOrderNum = -1;
    let neuronMap = array => {
        neurons = array.map((neuron, key) => {
            neuronOrderNum = neuronOrderNum + 1;
            return <Neuron
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
        return neurons
    };
	let renderSubList = () => {
    	if (subList.names) {

            props.addNames(subList.names);
    	    return neuronMap(subList.names);
        }
    	else {

    		let neuronsNameArray = [];
    		let neuronName = subListName;
    		for (let i = 0; i < num; i++) {
    			neuronsNameArray.push(neuronName)
    		}
            props.addNames(neuronsNameArray);

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
function mapDispatchToProps(dispatch) {
    return {
        addNames: names => {
            dispatch(actionAddNeuronsNames(names))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NeuronSubList)