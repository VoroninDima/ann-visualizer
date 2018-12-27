import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    dialogButton: {
        display:  'none'
    }
})


class WeightsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false
        }
    }
    handleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    setStyle() {
        let style
        this.state.isOpen ? style={display: 'block'} : style={display: 'none'};
        return style
    }
    renderRow() {
        let num = -1;
        let rows = this.props.tableData.firstNeuronLayerNames.map((name, key) => {
            num = num + 1;
            return(
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>
                    {this.props.tableData.weights[num].map((weight, key) => <TableCell key={key}>{weight}</TableCell> )}
                </TableRow>
            )
        });
    return rows
    }
    render() {
        return (
            <Paper style={{margin: 10}}>
                <Button className='table_btn' onClick={this.handleOpen.bind(this)}>Open</Button>
                <Table style={this.setStyle()}>
                    <TableHead>
                        <TableRow className='weights_row'>
                            <TableCell></TableCell>
                            {this.props.tableData.secondNeuronLayerNames.map((name, key) => <TableCell key={key}>{name}</TableCell> )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderRow()}

                    </TableBody>
                </Table>
            </Paper>
        );
    }

}
export default withStyles(styles)(WeightsTable);








