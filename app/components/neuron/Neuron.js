import React, {Component} from 'react'
import classnames from 'classnames';

import LinesList from 'components/lines-list/LinesList';
import {NeuronPopup} from 'components/neuron-popup';
import {connect} from 'react-redux'

class Neuron extends Component {
	constructor(props) {
		super(props);
		this.state = this.setDefaultState();

		this.ref = React.createRef();
        this.listName = this.props.listName;
        this.neuron = this.props.neuron;
        this.neuronOrderNum = this.props.neuronOrderNum;
        this.neuronListNum = this.props.neuronListNum;
        this.neuronSize = this.props.neuronSize
	}


    setDefaultState = () => {
	    return (
            {
                lineColor: '#bdbdbd',
                size: this.props.neuronSize,
                popupActive: false,
                neuronListLength: null,
                neuronProperties: {
                    neuronWidth: null,
                    neuronOffsetLeft: null,
                    neuronOffsetTop: null
                }
            }
        )
    };
    componentWillReceiveProps() {
        if (this.listName !== 'output') {
            this.getNeuronPosition();
            this.getNeuronListLength();
        }
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
        let style = {
            width: this.props.neuronSize,
            height:this.props.neuronSize,
            marginTop: this.props.offsetTop,
            backgroundColor: this.setColor()
        };
		return (
			<div
                onMouseOver={this.mouseOverEvent}
                onMouseOut={this.mouseOutEvent}
                style={style}
                ref={this.ref}
                className={classes}
            >
                {this.renderLinesList()}
                {this.renderNeuronPopup()}
            </div>
		)
	}



    setColor = () => {
	    const {neuronListNum, neuronColor} = this.props;
        return neuronColor[neuronListNum];

    };

	renderLinesList = () => {
	    const {neuronListLength, neuronProperties, lineColor, } = this.state;
	    if (neuronListLength && neuronProperties.neuronWidth) return (
            <LinesList
                neuronListNum={this.neuronListNum}
                neuronOrderNum={this.neuronOrderNum}
                neuronSize={this.neuronSize}
                lineBgc={lineColor}
                neuronListLength={neuronListLength}
                neuronProperties={neuronProperties}
                offsetTop={this.props.offsetTop}
            />
        )
    };

    renderNeuronPopup = () => {
	    const {activationFunction} = this.props;
	    return <NeuronPopup
            active={this.state.popupActive}
            neuronName={this.neuron}
            activationFunction={activationFunction}/>;
    };

    mouseOverEvent = (e) => {
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.popupShow();
            this.lineSelectedChangeColor();
        }
    };

    lineSelectedChangeColor = () => {
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
    };

    lineUnselectedChangeColor = () => {
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
    };

    mouseOutEvent = (e) => {
        const classes = e.target.classList[0];

        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.lineUnselectedChangeColor();
            this.popupHide();
        }
    };

    getPrevNeuronList = () => {
	    return this.ref
            .current
            .parentElement
            .parentElement
            .previousElementSibling
            .children[0]
            .children;
    };

    popupShow = () => {
	    this.setState({
            popupActive: true
        });
    };

    popupHide = () => {
	    this.setState({
            popupActive: false
        });
    };

    getNeuronListLength = () => {
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
    };

    getNeuronPosition = () => {
	    const ref = this.ref.current;
	    const refNext = this.ref.current.parentElement.parentElement.nextElementSibling;
        setTimeout(() => {
            const nextNeuronOffsetTop = refNext.offsetTop;
            const nextNeuronOffsetLeft = refNext.offsetLeft;
            const neuronWidth = 30;
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

function mapStateToProps(state) {
    return {
        offsetTop: state.changeSettings.offsetTop,

    }
}
export default connect(mapStateToProps)(Neuron)