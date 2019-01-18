import React, {Component} from 'react'

import LinesList from 'components/lines-list/LinesList';
import {NeuronPopup} from 'components/neuron-popup';
import {connect} from 'react-redux'
import changeLinesColorAction from '../../actions/actionChangePrevLinesColor';
import getNeuronPosition from './getNeuronPosition';
import {setDefaultState, setClassProperties} from './setClassConstructor';
import {setClassName, setStyle} from './setStyle'


class Neuron extends Component {
	constructor(props) {
		super(props);
		this.state = setDefaultState.bind(this)();
        setClassProperties.bind(this)()

	}

    componentWillReceiveProps() {
        if (this.listName !== 'output') {
            getNeuronPosition.bind(this)();
            this.getNeuronListLength();
        }
    }

    componentDidMount() {
        if (this.listName !== 'output') {
            getNeuronPosition.bind(this)();
            this.getNeuronListLength();
        }
    }

	render() {
		return (
			<div
                onMouseOver={this.mouseOverEvent}
                onMouseOut={this.mouseOutEvent}
                style={setStyle.bind(this)()}
                ref={this.ref}
                className={setClassName.bind(this)()}
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
        if (e.ctrlKey) return;
        this.colorActive = 60;
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.changeIsActive(true);
            this.prevLineChangeColor(this.getPrevListName());
        }
    };

    mouseOutEvent = (e) => {
        this.colorActive = 0;
        const classes = e.target.classList[0];
        if (classes === 'neuron'|| classes === 'neuronPopupParagraph') {
            this.changeIsActive(false);
            this.prevLineChangeColor(null);
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

        this.setState({ neuronListLength })
    };
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