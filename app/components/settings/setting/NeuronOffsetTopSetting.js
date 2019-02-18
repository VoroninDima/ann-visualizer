import React from 'react';
import {connect} from "react-redux";

import changeNeuronOffsetTopAction from '../../../actions/actionChangeNeuronOffsetTop'

import {Slider} from "material-ui-slider";

import neuronOffsetTopConfig from 'configs/components/neuronOffsetTopSettings'

class LineSizeSetting extends React.Component {
    render() {
        const {offsetTopMin, offsetTopMax} = neuronOffsetTopConfig;
        return <Slider
            value={this.props.offsetTop}
            onChange={value => this.props.setNeuronOffsetTopValue(value)}
            min={offsetTopMin}
            max={offsetTopMax}/>
    }
}

function mapStateToProps(state) {
    return {
        offsetTop: state.changeSettings.offsetTop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setNeuronOffsetTopValue: sliderValue => {
            dispatch(changeNeuronOffsetTopAction(sliderValue))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineSizeSetting);