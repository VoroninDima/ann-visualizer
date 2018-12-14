import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import LinesList from '../lines-list/LinesList.jsx';


let random = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
};

let rInp = random(1, 155),
	gInp = random(1, 155),
	bInp = random(1, 155),
	rHid = random(1, 155),
	gHid = random(1, 155),
	bHid = random(1, 155),
	rOut = random(1, 155),
	gOut = random(1, 155),
	bOut = random(1, 155)


let inpPosition = [];
let hidPosition;
let hidPositionArray = [];
let outPosition = [];

export default class Neuron extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		setTimeout(() => {
			let rect = ReactDOM.findDOMNode(this);
			console.dir(rect.getBoundingClientRect());
			let neuronSize = rect.getBoundingClientRect().height;
			if (rect.className === "neuron input") {
				inpPosition.push(rect.getBoundingClientRect())
			}
			if (rect.className === "neuron hidden") {
				hidPosition = rect.getBoundingClientRect();
				hidPositionArray.push(hidPosition)
			}
			if (rect.className === "neuron output") {
				outPosition = rect.getBoundingClientRect()
			}	
			this.setState({
				inpPosition: inpPosition,
				hidPosition: hidPosition,
				outPosition: outPosition,
				size: neuronSize
			});
			if (hidPositionArray.length === this.props.hidNum) {
				this.setState({
					hidPositionArray: hidPositionArray
				})
			}
		}, 0);
	}

	render() {
			return this.renderComponent();

	}
	renderComponent() {
		const neuron = this.props.neuron;
		const type = neuron.type;
		const classes = `neuron ${type}`;
		if (type === "input") {
			let style = {
				backgroundColor: `rgba(${rInp}, ${gInp}, ${bInp})`,
				transform: `translateX(${-this.state.size}px)`
			};

			return (
				<div ref={this.ref} style={style} className={classes}>
					<p>{this.props.neuron.name}</p>
				</div>
			);
		}

		if (type === "hidden") {
			const style = {
				backgroundColor: `rgba(${rHid}, ${gHid}, ${bHid})`,
			};
			return (
				<div style={style} ref={this.ref} className={classes}>
					<LinesList size={this.state.size}
							   hidPosition={hidPosition}
							   inpPosition={this.state.inpPosition}/>
					<p>{this.props.neuron.name}</p>
				</div>
			)
		}

		if (type === "output") {
			const style = {
				backgroundColor: `rgba(${rOut}, ${gOut}, ${bOut})`,
				transform: `translateX(${this.state.size}px)`
			};

			return (
				<div ref={this.ref} style={style} className={classes}>
					<LinesList size={this.state.size}
							   hidPosition={outPosition}
							   outPosition={this.state.hidPositionArray}/>
					<p>{this.props.neuron.name}</p>
				</div>
			)
		}
	}

}

