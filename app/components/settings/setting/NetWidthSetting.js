import React from 'react';

import changeNetWidthAction from '../../../actions/actionChangeNetWidth'
import {connect} from "react-redux";

import {Slider} from "material-ui-slider";

class NetWidthSetting extends React.Component {
    render() {
        return <Slider
            value={this.props.netWidth}
            min='1000'
            max='2000'
            onChange={value => this.props.setNetWidthValue(value)}

        />
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