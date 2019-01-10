import React, {Component} from 'react'
import classnames from 'classnames';

import LinesList from 'components/lines-list/LinesList';
import {NeuronPopup} from 'components/neuron-popup';
import {connect} from 'react-redux'
import changeLinesColorAction from '../../actions/actionChangeLinesColor';

class Neuron extends Component {
	constructor(props) {
		super(props);
		this.state = this.setDefaultState();

		this.ref = React.createRef();
        this.listName = this.props.listName;
        this.neuron = this.props.neuron;
        this.neuronOrderNum = this.props.neuronOrderNum;
        this.neuronListNum = this.props.neuronListNum;
        this.neuronSize = this.props.neuronSize;
        this.colorActive = null;
	}


    setDefaultState = () => {
	    return (
            {
                isActive: false,
                size: this.props.neuronSize,
                neuronListLength: null,
                linesListZIndex: 0,
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


    setColor = () => {
        const {neuronListNum, neuronColor} = this.props;
        return neuronColor[neuronListNum];
    };

	render() {
        const {listName, neuron, neuronSize, offsetTop} = this.props;
        const classes = classnames('neuron', listName, neuron);
        let {r, g, b} = this.setColor();
        const activeColor = this.colorActive;
        let style = {
            width: neuronSize,
            height: neuronSize,
            marginTop: offsetTop,
            border: `5px solid rgba(${r-activeColor}, ${g-activeColor}, ${b-activeColor})`
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



	renderLinesList = () => {
	    const {neuronListLength, isActive,  neuronProperties} = this.state;
	    const {offsetTop, listName} = this.props;
	    if (neuronListLength && neuronProperties.neuronWidth) return (
            <LinesList
                zIndex={this.state.linesListZIndex}
                getNextListName={this.getNextListName}
                neuronListNum={this.neuronListNum}
                neuronOrderNum={this.neuronOrderNum}
                neuronSize={this.neuronSize}
                isActive={isActive}
                neuronListLength={neuronListLength}
                neuronProperties={neuronProperties}
                offsetTop={offsetTop}
                listName={listName}
            />
        )
    };

    renderNeuronPopup = () => {
	    const {activationFunction} = this.props;
	    return <NeuronPopup
            active={this.state.isActive}
            neuronName={this.neuron}
            activationFunction={activationFunction}/>;
    };

    changeLinesListZIndex = linesListZIndex => {
        this.setState({linesListZIndex})
    }

    mouseOverEvent = (e) => {
        this.colorActive = 60;
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.changeIsActive(true);
            this.prevLineChangeColor(this.getPrevListName());
            this.changeLinesListZIndex(1)
        }
    };

    mouseOutEvent = (e) => {
        this.colorActive = 0;

        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.changeIsActive(false);
            this.prevLineChangeColor(null);
            this.changeLinesListZIndex(0)
        }
    };

    prevLineChangeColor = prevListName => this.props.setLineColorActive(prevListName);

    changeIsActive = boolean => this.setState({ isActive: boolean });

    getNextListName = () => {
        let className = this.ref.current
            .parentElement
            .parentElement
            .nextSibling
            .classList[1];
        if (!className) className = 'output';
        return className

    };

    getPrevListName = () => {
        const {listName, neuronOrderNum} = this.props;
        if(listName === 'input') return;
        let className = this.ref.current
            .parentElement
            .parentElement
            .previousSibling
            .classList[1];
        if (!className) className = 'input';
        return `from_${className}_to_${listName}_num_${neuronOrderNum+1}`

    };


    getNeuronListLength = () => {
        const neuronListLength = this.ref.current
                                .parentElement
                                .parentElement
                                .nextElementSibling
                                .children[0]
                                .children
                                .length;

        this.setState({ neuronListLength})
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
        offsetTop: state.changeSettings.offsetTop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLineColorActive: className => {
            dispatch(changeLinesColorAction(className))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Neuron)