import React from 'react';
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button';
import Modal from 'components/modal/Modal'
import dataGetter from './FileUploadDataGetter'

import actionSetStructure from '../../../actions/actionSetNetStructure';
import actionSetWeights from '../../../actions/actionSetWeights';

import styles from './fileUpload.css'

class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            structureFileName: '',
            weightsFileName: '',
            showModal: false
        }
    }

    render() {
        const {weightsFileName, structureFileName} = this.state;

        return (
            <React.Fragment>
                {this.whichModalRender()}
                <div className="input-file-modal">
                    <input
                        onChange={this.changeStructureSpan}
                        style={styles['inputfile']}
                        className="inputfile"
                        type="file"
                        id="structure_file"
                        name="structure_file"/>
                    <label htmlFor="structure_file">
                        <span>{structureFileName}</span><p>Choose structure</p>
                    </label>
                    <input
                        onChange={this.changeWeightsSpan}
                        style={styles['inputfile']}
                        className="inputfile"
                        type="file"
                        id="weights_file"
                        name="weights_file"/>
                    <label htmlFor="weights_file">
                        <span>{weightsFileName}</span><p>Choose weights</p>
                    </label>
                </div>
                <Button onClick={this.handleClick.bind(this)}>Confirm</Button>

            </React.Fragment>
        )
    }

    async handleClick() {
        const {structureFileName, weightsFileName} = this.state;

        this.setState({showModal: true});

        if (structureFileName === '' || weightsFileName === '')
            return;

        this.props.confirmClose(false);

        const {weights, structure} = await dataGetter.get();

        this.props.setStructure(structure);
        this.props.setWeights(weights);
    }

    hideModal = value => {
        this.setState({showModal: value})
    };

    whichModalRender() {
        const {showModal, weightsFileName, structureFileName} = this.state;

        if (!showModal) return;

        if (weightsFileName === '' && structureFileName !== '')
            return this.modalRender('Please select the weights');

        if (weightsFileName !== '' && structureFileName === '')
            return this.modalRender('Please select the structure');

        if (weightsFileName === '' && structureFileName === '')
            return this.modalRender('Please select the structure and the weights');

    }

    modalRender(innerText) {
        return <Modal
            innerText={innerText}
            hideModal={this.hideModal}/>
    }

    changeStructureSpan = e => {
        const currentFile = e.target.files[0];
        if (!currentFile) return;

        const structureFileName = currentFile.name;

        this.setState({structureFileName})

    };

    changeWeightsSpan = e => {
        const currentFile = e.target.files[0];

        if (!currentFile) return;

        const weightsFileName = currentFile.name;

        this.setState({weightsFileName})
    };



}

function mapStateToProps(state) {
    return {
        structure: state.setNetworkStructure.structure,
        weights: state.setWeightsValue.weights
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setStructure: structure => {
            dispatch(actionSetStructure(structure))
        },
        setWeights: weights => {
            dispatch(actionSetWeights(weights))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);