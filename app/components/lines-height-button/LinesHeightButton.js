import React from 'react';
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';

import showLineWeightsToSizeAction from '../../actions/actionShowLineWeightsToSize'

class LinesHeightButton extends React.Component {

    render() {
        return <Button onClick={() => {this.props.weightSize()}}>line size</Button>
    }
}


function mapStateToProps(state) {
    return {
        isActive: state.lineWeightsToSize.isActive
    }
}

function mapDispatchToProps(dispatch) {
    return {
        weightSize: value => {
            dispatch(showLineWeightsToSizeAction(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinesHeightButton);