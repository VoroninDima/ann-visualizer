import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import WeightsTable from 'components/weights-tabel/WeightsTable'



class WeightsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openTableId: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    createTableArray() {
        let tablesArray = [];
        for (let i = 0; i<this.props.weights.length; i++) {
            tablesArray.push({
                id: i,
                weights: this.props.weights[i],
                firstNeuronLayerNames: this.props.names[i],
                secondNeuronLayerNames: this.props.names[i+1],
                layersName: this.props.layersName[i],
                nextLayersName: this.props.layersName[i+1]
            })
        }
        return tablesArray
    }

    renderWeightsTable() {
        return this.createTableArray().map((table, key) =>
            <WeightsTable
                onButtonClick={this.handleClick.bind(this, table.id)}
                key={key}
                isOpen={this.state.openTableId === table.id}
                tableData={table}/> )
    }

    handleClick = openTableId => {
        this.setState({ openTableId })
    };

    render() {
        return (
            <React.Fragment>
                {this.renderButton()}
                {this.renderDialog()}
            </React.Fragment>
        );
    }

    renderDialog() {
        return (
            <Dialog
                className='weights_modal'
                open={this.state.open}
                onClose={this.handleClose}
            >
                <DialogTitle>Weight Table</DialogTitle>
                <DialogContent>
                    {this.renderWeightsTable()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    renderButton() {
        return (
            <Button className='weightTable__btn' onClick={this.handleClickOpen}>
                Weight Table
            </Button>
        )

    }
}

export  default  WeightsModal
