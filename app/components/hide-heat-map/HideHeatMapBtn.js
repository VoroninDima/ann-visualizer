import React from 'react';

import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import hideHeatMapAction from '../../actions/actionHideHeatMap'

class hideHeatMapBtn extends React.Component {
    action = () => this.props.isActive ? 'show' : 'hide';

    render() {
        return <Button onClick={() => {this.props.hideMap()}}>Heat map {this.action()}</Button>
    }
}

function mapStateToProps(state) {
    return {
        isActive: state.hideHeatMap.isActive
    }
}
function mapDispatchToProps(dispatch) {
    return {
        hideMap: value => {
            dispatch(hideHeatMapAction(value))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(hideHeatMapBtn);