import React from 'react'
import Neuron from '../neuron/Neuron.jsx'

export default function NeuronSubList(props) {
    let neuronOrderNum = -1;
    const subList = props.subList;
	let renderSubList = () => {
    	if (subList.names) {
    		let neurons = subList.names.map((neuron, key) => {
                neuronOrderNum = neuronOrderNum + 1
                return <Neuron key={key} neuronOrderNum={neuronOrderNum} neuron={neuron} listName={props.subListName}/>
            });
   			return neurons
    	} else {

    		let neuronsNameArray = [];
    		let neuronName = props.subListName;
    		for (let i = 0; i < subList.num; i++) {
    			neuronsNameArray.push(neuronName)
    		}
    		let neurons = neuronsNameArray.map((neuron, key) => {
                neuronOrderNum = neuronOrderNum + 1
    			return <Neuron key={key} neuronOrderNum={neuronOrderNum} neuron={neuron} listName={props.subListName}/>
            });
   			return neurons
    	}
    };

    return (
        <div>
        	{renderSubList()}
        </div>
    )


}