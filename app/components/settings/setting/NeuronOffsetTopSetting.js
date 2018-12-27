import React from 'react';
import changeNeuronOffsetTopAction from '../../../actions/actionChangeNeuronOffsetTop'

import {Slider} from "material-ui-slider";
import {connect} from "react-redux";

class LineSizeSetting extends React.Component {
    render() {
        return <Slider
            value={this.props.offsetTop}
            onChange={value => this.props.setNeuronOffsetTopValue(value)}
            min='10'
            max='50'
        />
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