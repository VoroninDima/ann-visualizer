import React from 'react'
import Neuron from './Neuron.jsx'

export default function NeuronList({neurons}) {
	let positionTop = {
		inputTop: 0,
		hiddenTop: 0,
		outputTop: 0
	}

	let inputNum = 0
	let outputNum = 0
	let linesHeight = 100
	let hiddenNum = 0
	for (let i = 0; i < neurons.length; i++) {
		if (neurons[i].type ==='hidden') hiddenNum = hiddenNum + 1
	}

	for (let i = 0; i < neurons.length; i++) {
		if (neurons[i].type ==='input') inputNum = inputNum + 1
	}
	for (let i = 0; i < neurons.length; i++) {
		if (neurons[i].type ==='output') outputNum = outputNum + 1
	}
	positionTop.inputTop = hiddenNum*120/2 - (inputNum*120/2)
	positionTop.outputTop = (hiddenNum*120/2) - (outputNum*120/2)
	
	let linesData = []

	for (let n = 0; n < hiddenNum; n++) {
		linesData.push({linesHeight})
		linesHeight = linesHeight + 100
		
	}
	const neuron = neurons.map((neuron) =><Neuron positionCenterInput={positionTop.inputTop} positionCenterOutput={positionTop.outputTop} key={neuron.unitsData[0].num} inputNum={inputNum} hiddenNum={hiddenNum}  linesData={linesData}  neuron = {neuron} position = {positionTop} num={hiddenNum}/>)
	return (
		<div className="ai">
			{neuron}
		</div>
	)

}