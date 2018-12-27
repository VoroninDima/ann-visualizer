import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LineSizeSetting from 'components/settings/setting/LineSizeSetting'
import NeuronSizeSetting from 'components/settings/setting/NeuronSizeSetting'
import NetWidthSetting from 'components/settings/setting/NetWidthSetting'
import NeuronOffsetTopSetting from 'components/settings/setting/NeuronOffsetTopSetting'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }


    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose () {
        this.setState({ open: false });
    };

    render() {
    return (
        <div>
            <Button className='settings__btn' onClick={this.handleClickOpen}>Settings</Button>
            <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <DialogTitle style={{width: 400}}>Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>Change line size:</DialogContentText>
                    <LineSizeSetting/>
                    <DialogContentText>Change neuron size:</DialogContentText>
                    <NeuronSizeSetting/>
                    <DialogContentText>Change net width:</DialogContentText>
                    <NetWidthSetting/>
                    <DialogContentText>Change neuron offset top:</DialogContentText>
                    <NeuronOffsetTopSetting/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    }
}

export default Settings;