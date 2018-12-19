import React from 'react';

import {Neuron} from 'components/neuron';
import {RandColorGenerator} from '../../lib/RandColorGenerator';
/**
 * @param {{}} props
 *     @param {{subList:string}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{subListName:string}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{num:int}} props
 * @returns {*}
 * @constructor
 */
export function NeuronSubList(props) {
    let style = RandColorGenerator();
    let neurons;
    let neuronOrderNum = -1;
    const subList = props.subList;
	let renderSubList = () => {
    	if (subList.names) {
    		neurons = subList.names.map((neuron, key) => {
                neuronOrderNum = neuronOrderNum + 1;
                return <Neuron neuronListBgc={style} key={key} neuronOrderNum={neuronOrderNum} neuron={neuron} listName={props.subListName}/>
            });
   			return neurons
    	} else {

    		let neuronsNameArray = [];
    		let neuronName = props.subListName;
    		for (let i = 0; i < subList.num; i++) {
    			neuronsNameArray.push(neuronName)
    		}
    		neurons = neuronsNameArray.map((neuron, key) => {
                neuronOrderNum = neuronOrderNum + 1;
    			return <Neuron neuronListBgc={style} key={key} neuronOrderNum={neuronOrderNum} neuron={neuron} listName={props.subListName}/>
            });
   			return neurons
    	}
    };

    return <div>{renderSubList()}</div>;
}