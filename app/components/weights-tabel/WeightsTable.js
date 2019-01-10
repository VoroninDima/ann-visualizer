import React from 'react';

import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Table
} from '@material-ui/core';




class WeightsTable extends React.Component {
    setStyle() {
        const ifIsOpen = {
            display: 'block',
            overflow: 'scroll',
            maxHeight: 400,
            maxWidth: 800
        };
        const ifIsClosed = {
            display: 'none',
        };
        return this.props.isOpen ? ifIsOpen : ifIsClosed;

    }


    render() {
        return (
            <Paper style={{margin: 10}}>
                {this.renderButton()}
                <Table style={this.setStyle()}>
                    <TableHead>
                        <TableRow className='weights_row'>
                            <TableCell>/</TableCell>
                            {this.renderFirstNeuronLayerRow()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRow()}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

    renderFirstNeuronLayerRow() {
        const secondNeuronLayerNames = this.props.tableData.secondNeuronLayerNames;
        return secondNeuronLayerNames.map((name, key) => <TableCell key={key}>{name}</TableCell> )
    }

    renderButton() {
        const {tableData, onButtonClick} = this.props;
        return (
            <Button className='table_btn' onClick={onButtonClick}>
                {`Weights between ${tableData.layersName} and ${tableData.nextLayersName}`}
            </Button>
        )
    }

    renderRow() {
        const {tableData} =this.props;
        let num = -1;
        return tableData.firstNeuronLayerNames.map((name, key) => {
            num = num + 1;
            return(
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>
                    {tableData.weights[num].map((weight, key) => <TableCell key={key}>{weight}</TableCell> )}
                </TableRow>
            )
        })
    }
}
export default WeightsTable








