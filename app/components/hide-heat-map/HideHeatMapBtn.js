import React from 'react';

import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import hideHeatMapAction from '../../actions/actionHideHeatMap'

const hideHeatMapBtn = (props) => {
    const action = () => props.isActive ? 'show' : 'hide';


    return (
        <Button onClick={() => {props.hideMap()}}>
            Heat map {action()}
        </Button>
    )
};

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