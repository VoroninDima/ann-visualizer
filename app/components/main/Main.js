import React, {Component} from 'react';
import {connect} from 'react-redux';

import {NeuronList} from 'components/neuron-list';
import actionChangeSize from '../../actions/actionChangeSize';
import actionSetStructure from '../../actions/actionSetNetStructure';
import actionSetWeights from '../../actions/actionSetWeights';
import {RandColorGenerator} from '../../lib/RandColorGenerator';

import moveNetwork from './mainMethods/moveNetwork';
import WheelZoom from './mainMethods/wheelZoom'

import mainConfig from 'configs/components/main'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top: 0,
        };
        this.color = null;
        this.ref = React.createRef();
        this.wheelData = null;
    }

    render() {
        return (
            <div style={this.parentStyle()} ref={this.ref} onWheel={this.wheelZoom.bind(this)}>
                <div
                    onMouseDown={this.onMouseDown}
                    style={this.setStyle()}
                    className="main">
                    {this.renderMain()}
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.getNeuronColor();
    }

    getNeuronColor() {
        let randomColorArray = [];
        for (let i = 0; i < this.props.structure.length; i++) {
            const randomColor = RandColorGenerator();
            randomColorArray.push(randomColor)
        }
        this.color = randomColorArray;
    }

    renderMain() {
        let {structure} = this.props;
        if (!structure)
            return;
        let neuronListNum = -1;
        return structure.map((list, key) => {
            neuronListNum = neuronListNum + 1;
            return (
                <NeuronList
                    neuronListNum={neuronListNum}
                    neuronColor={this.color}
                    key={key}
                    list = {list} />
            )
        });

    }

    onMouseDown = (e) => {
        moveNetwork.call(this, e)
    };

    wheelZoom = (e) => {
        this.wheelData = e;

        const wheel = new WheelZoom(this);

        const {zoomTranslate, wheelZoomValue} = wheel.get();

        if (!zoomTranslate)
            return;

        const {newTop, newLeft} = zoomTranslate;
        this.setState({
            top: newTop,
            left: newLeft,
        });

        this.props.setSliderValue(wheelZoomValue);

    };

    setNetTransform() {
        const {defZoomValue} = mainConfig;
        const scale = this.props.sliderValue / defZoomValue;
        const {left, top} = this.state;

        return `scale(${scale}) translate(${left}px, ${top}px)`;
    }

    parentStyle = () => {
        return {
            display: 'flex',
            justifyContent: 'center'
        }
    };

    setStyle() {
        const transform = this.setNetTransform();

        return {
            transform,
            width: this.props.netWidth,
            display: `flex`
        };
    }
}

function mapStateToProps(state) {
    const netWidth = state.changeSettings.netWidth;
    const sliderValue = state.changeSize.sliderValue;
    const structure = state.setNetworkStructure.structure;

    return {
        netWidth,
        sliderValue,
        structure,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSliderValue: sliderValue => {
            dispatch(actionChangeSize(sliderValue))
        },
        setStructure: structure => {
            dispatch(actionSetStructure(structure))
        },
        setWeights: weights => {
            dispatch(actionSetWeights(weights))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);