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

import weightsTableConfig from 'configs/components/weightTable'

class WeightsTable extends React.Component {
    render() {
        return (
            <Paper className="weightsTable">
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

    setStyle() {
        const {maxWidth, maxHeight} = weightsTableConfig;

        const ifIsOpen = {
            display: 'block',
            overflow: 'scroll',
            maxHeight,
            maxWidth
        };

        const ifIsClosed = {
            display: 'none',
        };

        return this.props.isOpen ? ifIsOpen : ifIsClosed;
    }

    renderFirstNeuronLayerRow() {
        const {tableData} =this.props;

        const secondNeuronLayerNames = tableData.secondNeuronLayerNames;

        return secondNeuronLayerNames.map((name, key) =>
            <TableCell key={key}>{name}</TableCell>
        )
    }

    renderButton() {
        const {tableData, onButtonClick} = this.props;
        const tableName = `Weights between ${tableData.layersName} and ${tableData.nextLayersName}`;

        return (
            <Button className='table_btn' onClick={onButtonClick}>
                {tableName}
            </Button>
        )
    }

    renderRow() {
        const {tableData} = this.props;

        let num = -1;

        return tableData.firstNeuronLayerNames.map((name, key) => {
            num = num + 1;

            return (
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>
                    {this.renderCell(num)}
                </TableRow>
            )
        })
    }

    renderCell(num) {
        const {tableData} =this.props;

        return tableData.weights[num].map((weight, key) =>
            <TableCell className="tableCell" key={key}>
                {weight}
            </TableCell>
        )
    }
}

export default WeightsTable;






