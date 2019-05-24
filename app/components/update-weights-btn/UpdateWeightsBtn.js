import React from 'react';

import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

class UpdateWeightsBtn extends React.Component {
    constructor(props) {
        super(props);

        this.ws = new WebSocket('ws://localhost:3000');

        this.state = {
            isActive: false
        }
    }

    action = () => {
        const {isActive} = this.state;

        let startOrEnd = 'start';

        if (isActive)
            startOrEnd = 'end';

        this.ws.send(startOrEnd + 'WeightsUpdate');

        this.setState({
            isActive: !isActive
        });
    };

    render() {
        let startOrFinish = 'Start';
        console.log()
        if (this.state.isActive)
            startOrFinish = 'Finish';

        return <Button disabled={!this.props.isStructureFromServer} onClick={() => this.action()}>{startOrFinish} weights updating</Button>
    }
}

function mapStateToProps(state) {
    return {
        isStructureFromServer: state.isStructureFromServer.isFromServer
    }
}


export default connect(mapStateToProps)(UpdateWeightsBtn);
