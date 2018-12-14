import React from 'react'
import Neuron from '../neuron/Neuron.jsx'

export default function NeuronList({neurons}) {
	let hidNum = 0;
	let inputsA = neurons.filter((num) => {
		if (num.type === 'input') return num
	});
	let hiddensA = neurons.filter((num) => {
		if (num.type === 'hidden') {
			hidNum = hidNum + 1;
			return num
		}
	});

	let outputsA = neurons.filter((num) => {
		if (num.type === 'output') return num
	});

	let inputs = inputsA.map((neuron, key) =>
		<Neuron key={key} neuron = {neuron} />
	);
	let hiddens = hiddensA.map((neuron, key) =>
		<Neuron key={key} neuron = {neuron}/>
	);
	let outputs = outputsA.map((neuron, key) =>
		<Neuron key={key} neuron = {neuron} hidNum={hidNum}/>
	);
	return (
		<div className="visualizer">

			<div className="hiddens">{hiddens}</div>
			<div className="inputs">{inputs}</div>
			<div className="outputs">{outputs}</div>
		</div>
	)


}