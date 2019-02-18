import classnames from 'classnames';

function setColor() {
    const {neuronListNum, neuronColor} = this.props;

    return neuronColor[neuronListNum];
}

function setClassName() {
    const {listName, neuron} = this.props;

    return classnames('neuron', listName, neuron);
}

function setStyle() {
    const {neuronSize, offsetTop} = this.props;

    let {r, g, b} = setColor.bind(this)();

    const activeColor = this.colorActive;

    return {
        width: neuronSize,
        height: neuronSize,
        marginTop: offsetTop,
        border: `5px solid rgba(${r-activeColor}, ${g-activeColor}, ${b-activeColor})`
    };
}

export {setClassName, setStyle}