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
	bOut = random(1, 155);

let rect
let inpPosition;
let hidPosition;
let hidPositionArray = [];
let outPosition;
let neuronSize;
export default class Neuron extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lineColor: '#bdbdbd'
		};
		this.handleHoverOn = this.handleHoverOn.bind(this)
		this.handleHoverOff = this.handleHoverOff.bind(this)
	}

	componentDidMount() {
		setTimeout(() => {
			rect = ReactDOM.findDOMNode(this);
			neuronSize = rect.getBoundingClientRect().height;
			if (rect.className === "neuron input") {
				inpPosition = rect.getBoundingClientRect()
			}
			if (rect.className === "neuron hidden") {
				hidPosition = rect.getBoundingClientRect();
				hidPositionArray.push(hidPosition)
			}

			if (rect.className === "neuron output") {
				outPosition = rect.getBoundingClientRect()
			}
				this.setState({
				})
			console.log(this.props)
		}, 0);
	}

	handleHoverOn() {
		this.setState({
			lineColor: 'red'

		})
		inpPosition = rect.getBoundingClientRect().top
		outPosition = rect.getBoundingClientRect().top
	}
	handleHoverOff() {
		this.setState({
			lineColor: '#bdbdbd'

		})
	}
	render() {
		const neuron = this.props.neuron;
		const type = neuron.type;
		const classes = `neuron ${type}`;

		if (type === "input") {
			const style = {
				backgroundColor: `rgba(${rInp}, ${gInp}, ${bInp})`,
				transform: `translateX(${-neuronSize}px)`
			};

			return (
				<div onMouseOver={this.handleHoverOn} onMouseLeave={this.handleHoverOff} style={style} className={classes}>
					<LinesList
						lineColor={this.state.lineColor}
						size={neuronSize}
						inpPosition={inpPosition}
						hidPositionArrayForInp={hidPositionArray}/>
					<p>{neuron.name}</p>

				</div>
			);
		}

		if (type === "hidden") {
			const style = {
				backgroundColor: `rgba(${rHid}, ${gHid}, ${bHid})`,
			};

			return (
				<div onMouseOver={this.handleHoverOn} onMouseLeave={this.handleHoverOff} style={style} className={classes}>
					<p>{neuron.name}</p>
				</div>
			)
		}

		if (type === "output") {
			const style = {
				backgroundColor: `rgba(${rOut}, ${gOut}, ${bOut})`,
				transform: `translateX(${neuronSize}px)`
			};

			return (
				<div onMouseOver={this.handleHoverOn} onMouseLeave={this.handleHoverOff} style={style} className={classes}>
					<LinesList
						lineColor={this.state.lineColor}
						size={neuronSize}
						outPosition={outPosition}
						hidPositionArrayForOut={hidPositionArray}/>
					<p>{neuron.name}</p>
				</div>
			)
		}
	}


}

