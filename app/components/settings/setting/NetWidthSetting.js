import React from 'react';
import {connect} from "react-redux";

import changeNetWidthAction from '../../../actions/actionChangeNetWidth'

import {Slider} from "material-ui-slider";

import netWidthConfig from 'configs/components/netWidthSettings'

class NetWidthSetting extends React.Component {
    render() {
        const {netWidthMin, netWidthMax} = netWidthConfig;
        return <Slider
            value={this.props.netWidth}
            min={netWidthMin}
            max={netWidthMax}
            onChange={value => this.props.setNetWidthValue(value)}/>
    }
}

function mapStateToProps(state) {
    return {
        netWidth: state.changeSettings.netWidth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setNetWidthValue: sliderValue => {
            dispatch(changeNetWidthAction(sliderValue))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NetWidthSetting)