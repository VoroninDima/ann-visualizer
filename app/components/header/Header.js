import React, {Component} from 'react'

import Button from '@material-ui/core/Button';
import Slide from 'components/slider/Slider';
import Settings from 'components/settings/Settings';
import WeightsModal from 'components/weights-modal/WeightsModal'
import HideHeatMapBtn from 'components/hide-heat-map/HideHeatMapBtn'
import LinesHeightsButton from 'components/lines-height-button/LinesHeightButton'

import {connect} from 'react-redux';
import hideBtnClickAction from '../../actions/actionHideBtnClick'


class Header extends Component{
    hideLinesBtnClicked = () => {
        if (!this.props.btnActive)
            this.props.onHideLinesBtnClicked('Hide lines');
        else
            this.props.onHideLinesBtnClicked('Show lines');
    };

    renderWeightsModal = () => {
        const {structure, weights} = this.props;

        if (structure.length !== 0 )
            return (
            <WeightsModal
                structure={structure}
                weights={weights}/>
        )
    };

    renderButton =() => {
        return (
            <Button
                onClick={this.hideLinesBtnClicked}
                className='header__btn' >

                {this.props.innerText}
            </Button>
        )

    };



    render() {
        return (
            <div className='header'>
                <Settings/>
                <Slide/>
                <HideHeatMapBtn/>
                <LinesHeightsButton/>
                {this.props.weights ? this.renderWeightsModal(): ''}
                {this.renderButton()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        innerText: state.hideBtnClick.btnText,
        btnActive: !state.hideBtnClick.btnActive,
        weights: state.setWeightsValue.weights,
        structure: state.setNetworkStructure.structure
}
}

function mapDispatchToProps(dispatch) {
    return {
        onHideLinesBtnClicked: (innerText) => {
            dispatch(hideBtnClickAction(innerText))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
