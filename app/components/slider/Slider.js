import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Slider} from 'material-ui-slider';
import Button from '@material-ui/core/Button';

import actionChangeSize from '../../actions/actionChangeSize';
import actionResetSettings from '../../actions/actionResetSettings';

import defSettingsConfig from 'configs/components/defSettings'

class Slide extends Component {
    resetSettings = () => {
        const {netWidth, lineSize, neuronOffsetTop, neuronSize} = defSettingsConfig;

        this.props.setSliderValue(50);
        this.props.setSettings([netWidth, neuronOffsetTop, neuronSize, lineSize])
    };

    render() {
        return (
            <React.Fragment>
                <Slider
                    type='range'
                    value={this.props.sliderValue}
                    min='20'
                    max='300'
                    onChange={value => this.props.setSliderValue(value)}
                    style={{width: 200}}/>

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