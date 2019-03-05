import React, {Component} from 'react'
import {connect} from 'react-redux'

import LinesList from 'components/lines-list/LinesList';
import {NeuronPopup} from 'components/neuron-popup';
import changeLinesColorAction from '../../actions/actionChangePrevLinesColor';
import getNeuronPosition from './NeuronPositionGetter';

import {setDefaultState, setClassProperties} from './setClassConstructor';
import {setClassName, setStyle} from './setStyle'

import neuronConfig from 'configs/components/neuron'

class Neuron extends Component {
    constructor(props) {
        super(props);

        this.state = setDefaultState.bind(this)();
        setClassProperties.bind(this)()

    }

    componentWillReceiveProps() {
        const isNotLastLayer = this.ref.current
                                    .parentElement
                                    .parentElement
                                    .nextSibling;

        if (isNotLastLayer) {
            getNeuronPosition.bind(this)();
            this.getNeuronListLength();

        }
        setClassProperties.bind(this)();

    }

    componentDidMount() {
        const isNotLastLayer = this.ref.current
                                    .parentElement
                                    .parentElement
                                    .nextSibling;

        if (isNotLastLayer) {
            getNeuronPosition.bind(this)();
            this.getNeuronListLength();
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
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
        if (!this.ref.current) return;
        const isNotLastLayer = this.ref.current
            .parentElement
            .parentElement
            .nextSibling;
        if (!isNotLastLayer) return;
        const {neuronListLength, isActive,  neuronProperties} = this.state;
        const {offsetTop, listName, weights} = this.props;
        if (neuronListLength && neuronProperties.neuronWidth) return (
            <LinesList
                weights={weights}
                getNextListName={this.getNextListName()}
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

        const {selectedColorDifference} = neuronConfig;
        this.colorActive = selectedColorDifference;
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
        if (this.ref.current.classList[1] ==='output' ) return;
        let className = this.ref.current
            .parentElement
            .parentElement
            .nextSibling
            .classList[1];

        if (!className)
            className = 'output';
        return className

    };

    getPrevListName = () => {
        const {listName, neuronOrderNum} = this.props;

        if(listName === 'input')
            return;

        let className = this.ref.current
            .parentElement
            .parentElement
            .previousSibling
            .classList[1];

        if (!className)
            className = 'input';

        return `from_${className}_to_${listName}_num_${neuronOrderNum+1}`
    };

    getNeuronListLength = () => {
        if (this.ref.current.classList[1] ==='output' ) return;

        const neuronListLength = this.ref.current
            .parentElement
            .parentElement
            .nextElementSibling
            .children[0]
            .children
            .length;

        this.setState({neuronListLength})
    };
}

function mapStateToProps(state) {
    return {
        offsetTop: state.changeSettings.offsetTop,
        weights: state.setWeightsValue.weights,
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