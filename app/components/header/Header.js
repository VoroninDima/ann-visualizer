import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Slide from 'components/slider/Slider';
import Settings from 'components/settings/Settings';
import {connect} from 'react-redux';
import hideBtnClickAction from '../../actions/actionHideBtnClick'
import WeightsModal from 'components/weights-modal/WeightsModal'

class Header extends Component{
    hideLinesBtnClicked() {
        if (!this.props.btnActive) this.props.onHideLinesBtnClicked('Hide lines');
        else this.props.onHideLinesBtnClicked('Show lines');
    }
    renderWeightsModal() {
        if (this.props.names.length !== 0 ) return <WeightsModal weights={this.props.weights} names={this.props.names}/>
    }
    render() {

        return (
            <div className='header'>
                <Settings/>
                <Slide/>
                {/*{this.renderWeightsModal()}*/}
                <Button onClick={this.hideLinesBtnClicked.bind(this)} className='header__btn'>{this.props.innerText}</Button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        innerText: state.hideBtnClick.btnText,
        btnActive: !state.hideBtnClick.btnActive,
        weights: state.weightsValue.weights,
        names: state.neuronsNames.neuronsNamesArray,

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
