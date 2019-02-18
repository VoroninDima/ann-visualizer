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
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };



    getNames(structure) {
        let namesArray = [];
        let ar = [];

        for(let i = 0; i < structure.length; i++) {
            if (structure[i].unitsData.length === 1) {
                if (structure[i].unitsData[0].names) {
                    namesArray.push(structure[i].unitsData[0].names)
                } else namesArray.push(...this.getNameless(structure[i]))
            }
            else structure[i].unitsData.forEach(el => ar.push(...el.names))
        }
        namesArray.push(ar);

        return namesArray
    };

    getNameless(array) {
        let ar = [];
        array.unitsData.forEach(data => {
            if (!data.names) {
                let ar2 = [];
                for (let i = 0; i < data.num; i++) {
                    ar2.push(array.name)
                }
                ar.push(ar2)
            }
        });
        return ar
    };

    getLayersNames(structure) {
        let ar = [];
        structure.forEach(el => {
            ar.push(el.name)
        });
        return ar
    };

    createTableArray() {
        let tablesArray = [];
        const {structure, weights} = this.props;
        for (let i = 0; i < weights.length; i++) {
            const firstNeuronLayerNames = this.getNames(structure)[i],
                  secondNeuronLayerNames = this.getNames(structure)[i+1],
                  layersName = this.getLayersNames(structure)[i],
                  nextLayersName = this.getLayersNames(structure)[i+1];

            tablesArray.push({
                id: i,
                weights: weights[i],
                firstNeuronLayerNames,
                secondNeuronLayerNames,
                layersName,
                nextLayersName
            })
        }

        return tablesArray
    }

    renderWeightsTable() {
        const tables = this.createTableArray();

        return tables.map((table, key) =>
            this.doRenderWeightsTable(table, key)
        );
    }

    doRenderWeightsTable(table, key) {
        const isOpen = this.state.openTableId === table.id;
        const handleClick = this.handleClick.bind(this, table.id);

        return (
            <WeightsTable
                onButtonClick={handleClick}
                key={key}
                isOpen={isOpen}
                tableData={table}
            />
        );
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
                onClose={this.handleClose}>

                <DialogTitle className='weightTableTitle'>Weight Table</DialogTitle>
                <DialogContent>
                    {this.renderWeightsTable()}
                </DialogContent>
                <DialogActions>
                    <Button style={{color: 'whitesmoke'}} onClick={this.handleClose} autoFocus>
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

export default WeightsModal

