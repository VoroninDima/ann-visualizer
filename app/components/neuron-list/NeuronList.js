import React from 'react'
import {NeuronSubList} from 'components/neuron-sub-list'
/**
 * @param {{}} props
 *     @param {{unitsData:string}}
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} list
 *     @param {{type:string}} list
 *     @param {{name:string}} list
 * @returns {*}
 * @constructor
 */

export function NeuronList({list}) {
	let subLists;
	let ar = [];
	const unitsData = list.unitsData;
    subLists = unitsData.map((subList, key) =>
        <NeuronSubList key={key} subList = {subList} subListName={list.name}/>
    );
	if(unitsData.length > 1) {
        for (let i = 0; i < unitsData.length; i++) {
            ar.push(...unitsData[i].names)
        }
		let ar2 = [{
        	names: ar
		}];
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