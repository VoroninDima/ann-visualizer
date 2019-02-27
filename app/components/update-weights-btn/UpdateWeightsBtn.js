import React from 'react';

import Button from '@material-ui/core/Button';


export default class UpdateWeightsBtn extends React.Component {
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

        if (this.state.isActive)
            startOrFinish = 'Finish';

        return <Button onClick={() => this.action()}>{startOrFinish} weights updating</Button>
    }
}
