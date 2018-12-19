import React, {Component} from 'react'

import {LinesList} from 'components/lines-list';
import {NeuronPopup} from 'components/neuron-popup';


let firstLinePositionArray = [];
let secondLinePosition;
let secondLineOffsetLeft;
let firstLineOffsetLeft;
let currentNum = 0;
let ar = null;
/**
 * @param {{}} props
 *     @param {{listName:string}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{neuron:string}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{neuronListBgc:string}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{offsetLeft:int}} previousElementSibling
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{neuronOrderNum:int}} props
 * @returns {*}
 * @constructor
 */
/**
 * @param {{}} props
 *     @param {{setState:method}} props
 * @returns {*}
 * @constructor
 */

export class Neuron extends Component {
	constructor() {
		super();
		this.state = {
			secondLinePosition: null,
            lineColor: '#bdbdbd',
            popupActive: false
		};
        this.mouseOverEvent = this.mouseOverEvent.bind(this);
        this.refreshAr = this.refreshAr.bind(this);
        this.mouseOutEvent = this.mouseOutEvent.bind(this);
        this.popupShow = this.popupShow.bind(this);
        this.popupHide = this.popupHide.bind(this);
	}
	componentDidMount() {
		this.getPosition();

    }

	render() {
        let classes = `neuron ${this.props.listName} ${this.props.neuron}`;
		return (
			<div onMouseOut={this.mouseOutEvent} style = {this.props.neuronListBgc} onMouseOver={this.mouseOverEvent}  ref={(div) => {this.position = div}} className={classes}>
                <LinesList
                    lineBgc={this.state.lineColor}
                    secondLineOffsetLeft={secondLineOffsetLeft}
                    firstLineOffsetLeft={firstLineOffsetLeft}
                    firstLinePositionArray={ar}
                    secondLinePosition={this.state.secondLinePosition}/>
                <NeuronPopup active={this.state.popupActive} neuronName={this.props.neuron}/>

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

            secondLineOffsetLeft = this.position.offsetLeft-this.position.clientWidth;
            secondLinePosition = this.position.offsetTop;
            this.setState({
                secondLinePosition: secondLinePosition
            })
        },0)
	}

    mouseOverEvent(e) {
        ar = [];

        if (e.target.className !== 'line') {
            this.popupShow();

            if (this.props.listName !== 'output') {
                const nextNeuronList = this.position.parentElement.parentElement.nextElementSibling.children[0].children;
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


    }

    mouseOutEvent(e) {

        if (e.target.className !== 'line') {

            this.popupHide();
            if (this.props.listName !== 'output') {
                const nextNeuronList = this.position.parentElement.parentElement.nextElementSibling.children[0].children;
                for (let i = 0; i < nextNeuronList.length; i++) {
                    nextNeuronList[i].children[0].children[this.props.neuronOrderNum].style.backgroundColor = '#bdbdbd'
                }
            }
            if (this.props.listName !== 'input') {
                this.setState({
                    lineColor: '#bdbdbd'
                })
            }
        }
	}

    refreshAr() {
	    const prevNeuronList = this.position.parentElement.parentElement.previousElementSibling.children[0].children;
        ar = [];
        for(let i = 0; i < prevNeuronList.length; i++) {
            ar.push(prevNeuronList[i].offsetTop)
        }
    }

    popupShow() {
	    this.setState({
            popupActive: true
        })
    }

    popupHide() {
	    this.setState({
            popupActive: false
        })
    }

}

