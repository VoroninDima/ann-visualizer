import React, {Component} from 'react'
import classnames from 'classnames';

import {LinesList} from 'components/lines-list';
import {NeuronPopup} from 'components/neuron-popup';

export class Neuron extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondLinePosition: null,
            lineColor: '#bdbdbd',
            popupActive: false,
            neuronListLength: null,
            neuronProperties: {
			    neuronWidth: null,
                neuronOffsetLeft: null,
                neuronOffsetTop: null
            }
		};
		this.ref = React.createRef();
        this.listName = this.props.listName;
        this.neuron = this.props.neuron;
        this.neuronOrderNum = this.props.neuronOrderNum;
        this.mouseOverEvent = this.mouseOverEvent.bind(this);
        this.mouseOutEvent = this.mouseOutEvent.bind(this);
        this.popupShow = this.popupShow.bind(this);
        this.popupHide = this.popupHide.bind(this);
        this.getNeuronListLength = this.getNeuronListLength.bind(this);
        this.setColor = this.setColor.bind(this);
	}

	componentDidMount() {
        if (this.listName !== 'output') {
            this.getNeuronPosition();
            this.getNeuronListLength();
        }
    }

	render() {
	    const {listName, neuron} = this.props;
        const classes = classnames('neuron', listName, neuron);
		return (
			<div
                onMouseOver={this.mouseOverEvent}
                onMouseOut={this.mouseOutEvent}
                style={this.setColor()}
                ref={this.ref}
                className={classes}>

                {this.renderLinesList()}
                {this.renderNeuronPopup()}
            </div>
		)
	}
    setColor() {
	    const {neuronListNum, neuronColor} = this.props;
	    let color = neuronColor[neuronListNum];
        return color
    }
	renderLinesList() {
	    if (this.state.neuronListLength && this.state.neuronProperties.neuronWidth) return (
            <LinesList
                lineBgc={this.state.lineColor}
                neuronListLength={this.state.neuronListLength}
                neuronProperties={this.state.neuronProperties}
            />
        )
    }

    renderNeuronPopup() {
	    return <NeuronPopup
            active={this.state.popupActive}
            neuronName={this.neuron}/>;
    }

    mouseOverEvent(e) {
	    if (e.target.classList.value !== 'line') {
            this.popupShow();
            this.lineSelectedChangeColor();
        }
    }
    lineSelectedChangeColor() {
        if (this.listName !== 'input') {
            for (let i = 0; i < this.getPrevNeuronList().length; i++) {
                this.getPrevNeuronList()[i]
                    .children[0]
                    .children[this.props.neuronOrderNum]
                    .style
                    .backgroundColor = 'red'
            }
        }
        this.setState({
            lineColor: 'red'
        })
    }
    lineUnselectedChangeColor() {
	    const {neuronOrderNum} = this.props;

        if (this.listName !== 'input') {
            for (let i = 0; i < this.getPrevNeuronList().length; i++) {
                this.getPrevNeuronList()[i]
                    .children[0]
                    .children[neuronOrderNum]
                    .style
                    .backgroundColor = '#bdbdbd'
            }
        }
        this.setState({
            lineColor: '#bdbdbd'
        })
    }
    mouseOutEvent(e) {
        if (e.target.classList.value !== 'line') {
            this.lineUnselectedChangeColor();
            this.popupHide();
        }
    }

    getPrevNeuronList() {
	    return this.ref
            .current
            .parentElement
            .parentElement
            .previousElementSibling
            .children[0]
            .children;
    }

    popupShow() {
	    this.setState({
            popupActive: true
        });
    }

    popupHide() {
	    this.setState({
            popupActive: false
        });
    }

    getNeuronListLength() {
        const neuronListLength = this.ref.current
                                .parentElement
                                .parentElement
                                .nextElementSibling
                                .children[0]
                                .children
                                .length;
        this.setState({
            neuronListLength
        })
    }

    getNeuronPosition() {
	    const ref = this.ref.current;
	    const refNext = this.ref.current.parentElement.parentElement.nextElementSibling;
        setTimeout(() => {
            const nextNeuronOffsetTop = refNext.offsetTop;
            const nextNeuronOffsetLeft = refNext.offsetLeft;
            const neuronWidth = ref.clientWidth;
            const neuronOffsetLeft = ref.offsetLeft;
            const neuronOffsetTop = ref.offsetTop;
            this.setState({
                 neuronProperties: {
                     neuronWidth,
                     neuronOffsetLeft,
                     neuronOffsetTop,
                     nextNeuronOffsetTop,
                     nextNeuronOffsetLeft
                 }
            });
        }, 0)
    }

}

