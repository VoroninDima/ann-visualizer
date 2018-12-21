import React from 'react';

import {Neuron} from 'components/neuron';

export function NeuronSubList(props) {
    const {neuronListNum,  neuronColor, subListName, subList} = props;
    const {num} = subList;
    let neurons;

    let neuronOrderNum = -1;
    let neuronMap = array => {
        neurons = array.map((neuron, key) => {
            neuronOrderNum = neuronOrderNum + 1;
            return <Neuron
                neuronListNum={neuronListNum}
                neuronColor={neuronColor}
                key={key}
                neuronOrderNum={neuronOrderNum}
                neuron={neuron}
                listName={subListName}
            />
        });
        return neurons
    };
	let renderSubList = () => {
    	if (subList.names) return neuronMap(subList.names);
    	else {
    		let neuronsNameArray = [];
    		let neuronName = subListName;
    		for (let i = 0; i < num; i++) {
    			neuronsNameArray.push(neuronName)
    		}
            return neuronMap(neuronsNameArray)
    	}
    };

    return <div>{renderSubList()}</div>;
}