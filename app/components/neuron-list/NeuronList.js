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

	const unitsPushLoop = (length, neuronName) => {
        let units = [];
        let name = neuronName;
        const {ActivationFunction} = unitsData[0];
        for (let i = 0; i < length; i++) {
            if (neuronName.length > 1)
                name = neuronName[i];

            units.push({name, ActivationFunction})
        }
        const unitsToObj = [{units}];
        return renderNeuronSubList(unitsToObj)
    };

	const makeSingleUnitsDataArray = () => {
        const {num, names} = unitsData[0];
        if (names)
            return unitsPushLoop(names.length, names);
        else
            return unitsPushLoop(num, [name])
    };

    const makeMultiUnitsDataArray = () => {
        let units = [];
        for (let j = 0; j < unitsData.length; j++) {
            const {ActivationFunction, names} = unitsData[j];
            names.forEach(name => {
                units.push({name, ActivationFunction})
            })
        }
        const unitsToObj = [{units}];
        return renderNeuronSubList(unitsToObj)
    };

    const renderLists = () => {
        if(unitsData.length === 1)
            return makeSingleUnitsDataArray();
        else
            return makeMultiUnitsDataArray()
	};

	const setClass = () => {
        const {type, name} = list;
        return `${type} ${name}`
    };


    return <div className={setClass()}>{renderLists()}</div>;
}
