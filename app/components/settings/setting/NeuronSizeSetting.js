import React from 'react';
import changeNeuronSizeAction from '../../../actions/actionChangeNeuronSize';
import {connect} from 'react-redux'

import {Slider} from "material-ui-slider";

class NeuronSizeSetting extends React.Component {

    render() {

        return <Slider
            value={this.props.neuronSize}
            onChange={value => this.props.setNeuronSizeValue(value)}
        />

    }
}
function mapStateToProps(state) {
    return {
        neuronSize: state.changeSettings.neuronSize
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setNeuronSizeValue: sliderValue => {
            dispatch(changeNeuronSizeAction(sliderValue))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NeuronSizeSetting)