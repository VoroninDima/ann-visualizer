import React from 'react'
import NeuronSubList from '../neuron-sub-list/NeuronSubList.jsx'

export default function NeuronList({list}) {
	let subLists;
	let ar = [];
    subLists = list.unitsData.map((subList, key) =>
        <NeuronSubList key={key} subList = {subList} subListName={list.name}/>
    );
	if(list.unitsData.length > 1) {
        for (let i = 0; i < list.unitsData.length; i++) {
            ar.push(...list.unitsData[i].names)
        }
		let ar2 = [{
        	names: ar
		}]
        subLists = ar2.map((subList, key) =>
            <NeuronSubList key={key} subList={subList} subListName={list.name}/>
        );
    }


    return (
    	<div className={`${list.type} ${list.name}`}>
			{subLists}
		</div>
	)



}