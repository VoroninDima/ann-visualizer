import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';


import LineSizeSetting from 'settings/LineSizeSetting'
import NeuronSizeSetting from 'settings/NeuronSizeSetting'
import NetWidthSetting from 'settings/NetWidthSetting'
import NeuronOffsetTopSetting from 'settings/NeuronOffsetTopSetting'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                {this.renderSettingsButton()}
                {this.renderSettingsDialog()}
            </div>
        )
    }


    renderSettingsButton = () => {
        return <Button className='settings__btn' onClick={this.handleClickOpen}>Settings</Button>
    };

    renderSettingsDialog = () => {
        return (
            <Dialog open={this.state.open} onClose={this.handleClose}>
                {Settings.renderDialogTitle()}
                {Settings.renderDialogContent()}
                {this.renderDialogActions()}
            </Dialog>
        )
    };

    static renderDialogTitle() {
        return <DialogTitle className='settingsTitle'>Settings</DialogTitle>
    }

    static renderDialogContent() {
        const textColor = {color: 'whitesmoke'};
        return (
            <DialogContent>
                <DialogContentText style={textColor}>Change line size:</DialogContentText>
                <LineSizeSetting/>
                <DialogContentText style={textColor}>Change neuron size:</DialogContentText>
                <NeuronSizeSetting/>
                <DialogContentText style={textColor}>Change net width:</DialogContentText>
                <NetWidthSetting/>
                <DialogContentText style={textColor}>Change neuron offset top:</DialogContentText>
                <NeuronOffsetTopSetting/>
            </DialogContent>
        )
    }

    renderDialogActions = () => {
        return (
            <DialogActions>
                <Button onClick={this.handleClose} style={{color: 'whitesmoke'}} autoFocus>
                    Close
                </Button>
            </DialogActions>
        )
    }
}

export default Settings;