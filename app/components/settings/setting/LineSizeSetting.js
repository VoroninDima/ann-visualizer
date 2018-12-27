import React from 'react';
import changeLineSizeAction from '../../../actions/actionChangeLineSize'

import {Slider} from "material-ui-slider";
import {connect} from "react-redux";

class LineSizeSetting extends React.Component {

    render() {

        return <Slider
            value={this.props.lineSize}
            onChange={value => this.props.setLineSizeValue(value)}
            min='1'
            max='5'
        />
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