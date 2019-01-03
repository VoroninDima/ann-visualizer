import React from 'react'
import NeuronSubList from 'components/neuron-sub-list/NeuronSubList'

export function NeuronList(props) {
	const {neuronListNum, neuronColor, list} = props;
    const {unitsData, name} = props.list;

	const renderNeuronSubList = array => {
	    return (
            array.map((subList, key) =>
                <NeuronSubList
                    subList = {subList}
                    neuronListNum={neuronListNum}
                    neuronColor={neuronColor}
                    key={key}
                    subListName={name}
                />
            )
        )
    };

	const renderLists = () => {
        let ar = [];

        if(unitsData.length === 1) {
            return renderNeuronSubList(unitsData)
        } else {
            for (let i = 0; i < unitsData.length; i++) {
                ar.push(...unitsData[i].names);
            }
            let ar2 = [{names: ar}];
            return renderNeuronSubList(ar2)
        }
	};

	const setClass = () => {
        const {type, name} = list;
        return `${type} ${name}`
    };



    return (
    	<div className={setClass()}>
			{renderLists()}
		</div>
	)



}
