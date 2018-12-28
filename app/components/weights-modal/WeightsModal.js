import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import WeightsTable from 'components/weights-tabel/WeightsTable'



class WeightsModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.createTableArray = this.createTableArray.bind(this);
        this.renderWeightsTable = this.renderWeightsTable.bind(this);
    }

    handleClickOpen() {
        this.setState({ open: true });
    }

    handleClose () {
        this.setState({ open: false });
    }
    createTableArray() {
        let tablesArray = [];
        for (let i = 0; i<this.props.weights.length; i++) {
            tablesArray.push({
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
        return this.createTableArray().map((table, key) => <WeightsTable key={key} tableData={table}/> )
    }

    render() {
        return (
            <React.Fragment>
                <Button className='weightTable__btn' onClick={this.handleClickOpen}>Weight Table</Button>
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
            </React.Fragment>
        );
    }
}

export  default  WeightsModal
