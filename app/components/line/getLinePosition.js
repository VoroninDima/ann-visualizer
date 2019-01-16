function getLinePosition() {
    const {lineData, lineEndsOffsetTop, neuronSize} = this.props;
    const {neuronProperties} = lineData;
    const {neuronOffsetTop, neuronOffsetLeft, nextNeuronOffsetLeft} = neuronProperties;
    this.beginTop = neuronOffsetTop;
    this.beginLeft = neuronOffsetLeft+neuronSize+12;
    this.endTop = lineEndsOffsetTop-neuronSize;
    this.endLeft = nextNeuronOffsetLeft;
}

function setWidth() {
    getLinePosition.bind(this)();

    let length = Math.sqrt(
        lineLeftSubtraction.bind(this)() * lineLeftSubtraction.bind(this)()
        + lineTopSubtraction.bind(this)() * lineTopSubtraction.bind(this)()
    );
    return Math.abs(length) + 'px';

}

function lineLeftSubtraction() {
    return this.endLeft - this.beginLeft
}

function lineTopSubtraction() {
    return this.endTop - this.beginTop
}

function setAngle () {
    return Math.atan2(lineTopSubtraction.bind(this)(), lineLeftSubtraction.bind(this)()) * 180 / Math.PI;
}
function getPos() {
    return {angle: setAngle.bind(this)(), width: setWidth.bind(this)()}
}
export default getPos;
