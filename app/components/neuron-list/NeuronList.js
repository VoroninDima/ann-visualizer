import React from 'react'
import NeuronSubList from 'components/neuron-sub-list/NeuronSubList'

export function NeuronList(props) {
	const {neuronListNum, neuronColor} = props;
    let subLists;
	let ar = [];
    const list = props.list;
	const {unitsData} = props.list;
    subLists = unitsData.map((subList, key) =>
        <NeuronSubList
            neuronListNum={neuronListNum}
            neuronColor={neuronColor}
            key={key}
            subList = {subList}
            subListName={list.name}
        />
    );
	if(unitsData.length > 1) {
        for (let i = 0; i < unitsData.length; i++) {
            ar.push(...unitsData[i].names)
        }
		let ar2 = [{names: ar}];
        subLists = ar2.map((subList, key) =>
            <NeuronSubList
                neuronListNum={neuronListNum}
                neuronColor={neuronColor}
                key={key}
                subList={subList}
                subListName={list.name}
            />
        );
    }
    return (
    	<div className={`${list.type} ${list.name}`}>
			{subLists}
		</div>
	)



}
