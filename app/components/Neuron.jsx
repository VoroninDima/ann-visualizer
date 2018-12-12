import React, {Component} from 'react'
import LinesList from './LinesList.jsx'
let inputTop = []
let hiddenTop = []
let outputTop = []
let pos = {
	input: inputTop,
	hidden: hiddenTop,
	output: outputTop,
}
let paddingTop = 120	

let random = (min, max) => {
		    let rand = min + Math.random() * (max + 1 - min);
		    rand = Math.floor(rand);
		    return rand;	  
}
let rInp = random(1, 255)
let gInp = random(1, 255)
let bInp = random(1, 255)
let rHid = random(1, 255)
let gHid = random(1, 255)
let bHid = random(1, 255)
let rOut = random(1, 255)
let gOut = random(1, 255)
let bOut = random(1, 255)
export default class Neuron extends Component {
	render() {
		


		const neuron = this.props.neuron;
		const position = this.props.position;
		const type = neuron.type;
		const classes = `neuron ${type}`
		const neuronNum = this.props.num
		if (type === 'input') {
			let top = position.inputTop += paddingTop;
			let style = {marginTop: top + 'px', backgroundColor: `rgba(${rInp}, ${gInp}, ${bInp})`}

			inputTop.push(top)
			return (
			<div className={classes} style={style}>
				<p>{neuron.name}</p>
				<LinesList 
				multiply={1}
				aOffsetLeft={400} 
				positionCenter={this.props.positionCenterInput}
				inputNum={this.props.inputNum} 
				hiddenNum={this.props.hiddenNum} 
				ar={this.props.linesData} />
			</div>
			)
		}
		if (type === 'hidden') {
			let top = position.hiddenTop += paddingTop;
			let style = {marginTop: top + 'px', backgroundColor: `rgba(${rHid}, ${gHid}, ${bHid})`}
			hiddenTop.push(top)
			return (
			<div className={classes} style={style}>
				<p>{neuron.name}</p>
			</div>
			)
		}

		if (type === 'output') {
			let top = position.outputTop += paddingTop;
			let style = {marginTop: top + 'px', backgroundColor: `rgba(${rOut}, ${gOut}, ${bOut})`}

			outputTop.push(top)
			return (
			<div className={classes} style={style}>
				<p>{neuron.name}</p>
				<LinesList 
				multiply={4} 
				aOffsetLeft={700} 
				positionCenter={this.props.positionCenterOutput}
				inputNum={this.props.inputNum} 
				hiddenNum={this.props.hiddenNum} 
				ar={this.props.linesData} />
			</div>
			)
		}
		
	}	
}
