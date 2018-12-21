import React, {Component} from 'react'
import { Slider } from 'material-ui-slider';
import {connect} from 'react-redux'
import actionChangeSize from '../../actions/actionChangeSize'
class Slide extends Component {
    render() {
        return <Slider
            min='20'
            max='200'
            onChange={value => this.props.setSliderValue(value)}
            style={{width: '200px', marginLeft: '200px'}}
        />
    }
}
function mapStateToProps(state) {
    return {
        sliderValue: state.changeSize.sliderValue
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setSliderValue: sliderValue => {
            dispatch(actionChangeSize(sliderValue))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Slide)