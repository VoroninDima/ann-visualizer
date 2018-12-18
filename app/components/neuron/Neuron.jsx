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
let firstLinePositionArray = [];
let secondLinePosition;
let secondLineOffsetLeft;
let firstLineOffsetLeft;
let currentNum = 0;
let ar = null;
let style;
export default class Neuron extends Component {
	constructor() {
		super();
		this.state = {
			secondLinePosition: null,
            lineColor: '#bdbdbd'
		}
        this.changeLineColorOver = this.changeLineColorOver.bind(this);
        this.refreshAr = this.refreshAr.bind(this);
        this.changeLineColorOut = this.changeLineColorOut.bind(this);
	}
	componentDidMount() {
		this.getPosition()
	}

	render() {
        this.setNeuronBgc();
        let classes = `neuron ${this.props.listName} ${this.props.neuron}`;
		return (
			<div onMouseOut={this.changeLineColorOut} onMouseOver={this.changeLineColorOver} style={style} ref={(div) => {this.position = div}} className={classes}>
				<LinesList  lineBgc={this.state.lineColor} secondLineOffsetLeft={secondLineOffsetLeft} firstLineOffsetLeft={firstLineOffsetLeft} firstLinePositionArray={ar} secondLinePosition={this.state.secondLinePosition}/>
			</div>
		)
	}

	getPosition() {
		const neuronSublistLength = this.position.parentElement.children.length;
		setTimeout(()  => {
            currentNum = currentNum + 1;
            if (currentNum <= neuronSublistLength) firstLinePositionArray.push(this.position.offsetTop);
            if (neuronSublistLength === currentNum) {
                currentNum = 0;
            }
            if (currentNum === 1) {

                ar = [...firstLinePositionArray];
				ar.splice(ar.length-1);
                firstLinePositionArray = [];
                firstLinePositionArray.push(this.position.offsetTop);
            }
            if (this.props.listName !== 'input') {
                firstLineOffsetLeft = this.position.parentElement.parentElement.previousElementSibling.offsetLeft

            }

            secondLineOffsetLeft = this.position.offsetLeft-this.position.clientWidth
            secondLinePosition = this.position.offsetTop;
            this.setState({
                secondLinePosition: secondLinePosition
            })
        },0)
	}

    setNeuronBgc() {
        if(this.props.listName === 'input') {
            style = {backgroundColor: `rgba(${rInp}, ${gInp}, ${bInp})`}
        }
        if(this.props.listName.includes('hidden')) {
            style = {backgroundColor: `rgba(${rHid}, ${gHid}, ${bHid})`}
        }
        if(this.props.listName === 'output') {
            style = {backgroundColor: `rgba(${rOut}, ${gOut}, ${bOut})`}
        }
    }

    changeLineColorOver() {
        if (this.props.listName !== 'output') {
            const nextNeuronList = this.position.parentElement.parentElement.nextElementSibling.children[0].children
            for (let i = 0; i < nextNeuronList.length; i++) {
                nextNeuronList[i].children[0].children[this.props.neuronOrderNum].style.backgroundColor = 'red'
            }
        }
	    if (this.props.listName !== 'input') {
            this.setState({
                lineColor: 'red'
            });
            this.refreshAr()
        }

    }

    changeLineColorOut() {
        if (this.props.listName !== 'output') {
            const nextNeuronList = this.position.parentElement.parentElement.nextElementSibling.children[0].children
            for(let i = 0; i < nextNeuronList.length; i++) {
                nextNeuronList[i].children[0].children[this.props.neuronOrderNum].style.backgroundColor = '#bdbdbd'
            }
        }
	    if (this.props.listName !== 'input') {
            this.setState({
                lineColor: '#bdbdbd'
            })
        }
	}

    refreshAr() {
	    const prevNeuronList = this.position.parentElement.parentElement.previousElementSibling.children[0].children
        ar = [];
        for(let i = 0; i < prevNeuronList.length; i++) {
            ar.push(prevNeuronList[i].offsetTop)
        }
    }


}

