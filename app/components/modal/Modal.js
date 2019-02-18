import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import styles from './modal.css'

class Modal extends Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.hideModal(false);
    };

    render() {
        const {innerText} = this.props;

        return (
            <div >
                <Dialog
                    className="modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent >
                        <DialogContentText id="alert-dialog-description">
                            {innerText}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default Modal;