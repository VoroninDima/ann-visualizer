import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Slide from 'components/slider/Slider';
import {connect} from 'react-redux';
import hideBtnClickAction from '../../actions/actionHideBtnClick'

class Header extends Component{
    hideLinesBtnClicked() {
        if (!this.props.btnActive) this.props.onHideLinesBtnClicked('Hide lines');
        else this.props.onHideLinesBtnClicked('Show lines');
    }
    render() {

        return (
            <div className='header'>
                <Slide/>
                <Button onClick={this.hideLinesBtnClicked.bind(this)} className='header__btn'>{this.props.innerText}</Button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        innerText: state.hideBtnClick.btnText,
        btnActive: !state.hideBtnClick.btnActive
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
