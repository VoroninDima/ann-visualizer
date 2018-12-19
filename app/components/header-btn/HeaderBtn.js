import React, {Component} from 'react';
import {connect} from 'react-redux';

class HeaderBtn extends Component {
    hideLinesBtnClicked() {
        if (!this.props.btnActive) this.props.onHideLinesBtnClicked('Hide lines');
         else this.props.onHideLinesBtnClicked('Show lines');

        console.log(this.props.btnActive);

    }
    render() {
        return <button onClick={this.hideLinesBtnClicked.bind(this)} className='header__btn' >{this.props.innerText}</button>
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
)(HeaderBtn)
