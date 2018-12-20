import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

class Header extends Component{
    hideLinesBtnClicked() {
        if (!this.props.btnActive) this.props.onHideLinesBtnClicked('Hide lines');
        else this.props.onHideLinesBtnClicked('Show lines');

        console.log(this.props.btnActive);

    }
    render() {
        return (
            <div className='header'>
                <Button className='header__btn' onClick={this.hideLinesBtnClicked.bind(this)}>{this.props.innerText}</Button>
            </div>
        )
    }
}
export default connect(
    state => ({
        innerText: state.btnText,
        btnActive: !state.btnActive
    }),
    dispatch => ({
        onHideLinesBtnClicked: (innerText) => {
            dispatch({ type:'changeText', payload: innerText})
        }
    })
)(Header)
