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
        let units = [];

        if(unitsData.length === 1) {
            const {ActivationFunction} = unitsData[0];
            if (unitsData[0].names) {
                unitsData[0].names.forEach(name => {
                    units.push({name, ActivationFunction})
                });
                const unitsToObj = [{units}];
                return renderNeuronSubList(unitsToObj)
            } else {
                for (let i = 0; i < unitsData[0].num; i++) {
                    units.push({name, ActivationFunction})
                }
                const unitsToObj = [{units}];
                return renderNeuronSubList(unitsToObj)

            }
        }

        if(unitsData.length !== 1) {
            for (let i = 0; i < unitsData.length; i++) {
                const ActivationFunction = unitsData[i].ActivationFunction;
                unitsData[i].names.forEach(name => {
                    units.push({name, ActivationFunction})
                })
            }
            const unitsToObj = [{units}];
            return renderNeuronSubList(unitsToObj)
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
