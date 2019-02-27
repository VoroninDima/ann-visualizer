import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    AppBar,
    Tabs,
    Tab
} from '@material-ui/core';

import LineSizeSetting from 'settings/LineSizeSetting'
import NeuronSizeSetting from 'settings/NeuronSizeSetting'
import NetWidthSetting from 'settings/NetWidthSetting'
import NeuronOffsetTopSetting from 'settings/NeuronOffsetTopSetting'

import FileUpload from './file-upload/FileUpload'
import ChooseStructureModal from './choose-structure-modal/ChooseStructureModal'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            value: 2
        };
    }

    confirmClose = value => {
        this.setState({open: value})
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
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
        const {value} = this.state;

        return (
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={this.handleChange}>
                            <Tab label="Settings" />
                            <Tab label="Upload file" />
                            <Tab label="Select structure" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && Settings.renderSettings()}
                    {value === 1 && <FileUpload confirmClose={this.confirmClose} />}
                    {value === 2 && <ChooseStructureModal />}
                    {this.renderDialogActions()}
                </Dialog>
        )
    };

    static renderSettings() {
        return (
            <div>
                {Settings.renderDialogTitle()}
                {Settings.renderDialogContent()}
            </div>
        )
    }


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