import React, {Component} from 'react'
import { Slider } from 'material-ui-slider';
import {connect} from 'react-redux'
import actionChangeSize from '../../actions/actionChangeSize';
import actionResetSettings from '../../actions/actionResetSettings';
import Button from '@material-ui/core/Button';

class Slide extends Component {
    resetSettings = () => {
        this.props.setSliderValue(50);
        this.props.setSettings([1200, 20, 60, 1])
    };

    render() {
        return (
            <React.Fragment>
                <Slider
                    type='range'
                    value={this.props.sliderValue}
                    min='20'
                    max='200'
                    onChange={value => this.props.setSliderValue(value)}
                    style={{width: 200}}
                />
                <Button className='refresh__btn' onClick={() => this.resetSettings()}>reset settings</Button>
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
        },
        setSettings: settingsValue => {
            dispatch(actionResetSettings(settingsValue))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Slide)