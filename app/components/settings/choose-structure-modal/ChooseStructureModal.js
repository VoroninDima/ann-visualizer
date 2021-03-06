import React, {Component} from 'react';
import {connect} from 'react-redux';
import actionSetStructure from '../../../actions/actionSetNetStructure';
import actionSetWeights from '../../../actions/actionSetWeights';
import actionUpdateWeights from '../../../actions/updateWeights';
import switchStructureFromServer from '../../../actions/actionSwitchStructureFromServer';

class ChooseStructureModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.ws = new WebSocket('ws://localhost:3000');
    }

    render() {
        this.getSocket();

        return (
            <div>
                {this.renderButtons()}
            </div>
        )
    }

    getSocket() {
        this.ws.onmessage = event => {
            const messagType = event.data.split('?')[0];

            if (messagType === 'updateWeights') {
                this.props.updateWeights(JSON.parse(JSON.parse(event.data.split('?')[1])[0].weights));
                return;
            }

            if (messagType === 'update') {
                const structure = JSON.parse(event.data.split('?')[1]).structure;
                const weights = JSON.parse(event.data.split('?')[1]).weights;

                this.props.setStructure(structure);
                this.props.setWeights(weights);
                return;
            }

            this.setState({
                data: JSON.parse(event.data)
            })
        };
    }

    handleClick = e => {
        this.props.updateWeights(null);
        this.props.setStructureFromServer(true);

        this.ws.send('update?'+e.target.textContent);
    };

    renderButtons() {
        const {data} = this.state;

        if (!data) return;

        return data.map(network =>
            <button
                key={network.id}
                onClick={this.handleClick}>

                {network.id}
            </button>
        )
    }
}


function mapStateToProps(state) {
    const structure = state.setNetworkStructure.structure;

    return {
        structure,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setStructure: structure => {
            dispatch(actionSetStructure(structure))
        },
        setWeights: weights => {
            dispatch(actionSetWeights(weights))
        },
        updateWeights: weights => {
            dispatch(actionUpdateWeights(weights))
        },
        setStructureFromServer: boolean => {
            dispatch(switchStructureFromServer((boolean)))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseStructureModal);