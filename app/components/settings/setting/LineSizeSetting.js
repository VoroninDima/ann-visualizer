import React from 'react';
import {connect} from "react-redux";

import changeLineSizeAction from '../../../actions/actionChangeLineSize'

import {Slider} from "material-ui-slider";

import lineSizeConfig from 'configs/components/lineSizeSettings'

class LineSizeSetting extends React.Component {
    render() {
        const {lineSizeMin, lineSizeMax} = lineSizeConfig;

        return <Slider
            value={this.props.lineSize}
            onChange={value => this.props.setLineSizeValue(value)}
            min={lineSizeMin}
            max={lineSizeMax}/>
    }
}

function mapStateToProps(state) {
    return {
        lineSize: state.changeSettings.lineSize
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setLineSizeValue: sliderValue => {
            dispatch(changeLineSizeAction(sliderValue))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineSizeSetting);