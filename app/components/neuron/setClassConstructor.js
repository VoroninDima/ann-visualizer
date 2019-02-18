import React from 'react'

function setDefaultState() {
    return (
        {
            isActive: false,
            size: this.props.neuronSize,
            neuronListLength: null,
            neuronProperties: {
                neuronWidth: null,
                neuronOffsetLeft: null,
                neuronOffsetTop: null
            }
        }
    )
}

function setClassProperties() {
    const {listName, neuron, neuronOrderNum, neuronListNum, neuronSize} = this.props;

    this.ref = React.createRef();

    this.listName = listName;

    this.neuron = neuron;
    this.neuronOrderNum = neuronOrderNum;
    this.neuronListNum = neuronListNum;
    this.neuronSize = neuronSize;

    this.colorActive = null;
}

export {setDefaultState, setClassProperties}