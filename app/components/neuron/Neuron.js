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
        this.neuronSize = this.props.neuronSize
	}


    setDefaultState = () => {
	    return (
            {
                isActive: false,
                size: this.props.neuronSize,
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

        const {listName, neuron, neuronSize, offsetTop} = this.props;
        const classes = classnames('neuron', listName, neuron);

        let style = {
            width: neuronSize,
            height: neuronSize,
            marginTop: offsetTop,
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
	    const {neuronListLength, isActive,  neuronProperties} = this.state;
	    const {offsetTop, listName} = this.props;
	    if (neuronListLength && neuronProperties.neuronWidth) return (
            <LinesList
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


    mouseOverEvent = (e) => {
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.setActive();
            this.prevLineChangeColorActive();
        }
    };

    mouseOutEvent = (e) => {
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.setDisactive();
            this.prevLineChangeColorDisactive()
        }
    };


    prevLineChangeColorActive = () => {
        this.props.setLineColorActive(this.getPrevListName())
    };
    prevLineChangeColorDisactive = () => {
        this.props.setLineColorActive(null)
    };


    setActive = () => this.setState({ isActive: true });
    setDisactive = () => this.setState({ isActive: false });



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