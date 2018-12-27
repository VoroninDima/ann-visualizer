import React, {Component} from 'react'
import { Slider } from 'material-ui-slider';
import {connect} from 'react-redux'
import actionChangeSize from '../../actions/actionChangeSize';
import Button from '@material-ui/core/Button';

class Slide extends Component {
    render() {
        return (
            <React.Fragment>
                <Slider
                    type='range'
                    value={this.props.sliderValue}
                    min='20'
                    max='200'
                    onChange={value => this.props.setSliderValue(value)}
                    style={{width: '200px'}}
                />
                <Button className='refresh__btn' onClick={() => this.props.setSliderValue(50)}>Refresh</Button>
            </React.Fragment>
        )
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