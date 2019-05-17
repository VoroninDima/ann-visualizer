import neuronConfig from 'configs/components/neuron'

export default class LinePositionGetter {
    constructor(props) {
        const {lineData, lineEndsOffsetTop, neuronSize} = props;

        const {neuronOffsetTop, neuronOffsetLeft, nextNeuronOffsetLeft} = lineData.neuronProperties;

        const {borderSize} = neuronConfig;
        const offsetLeft = neuronOffsetLeft+neuronSize+borderSize;

        this.beginTop = neuronOffsetTop;
        this.beginLeft = offsetLeft;
        this.endTop = lineEndsOffsetTop-neuronSize;
        this.endLeft = nextNeuronOffsetLeft;
    }

    getter() {
        return {
            width: this.setWidth(),
            angle: this.setAngle()
        }
    }

    setWidth() {
        let length = Math.sqrt(
            this.lineLeftSubtraction() * this.lineLeftSubtraction()
            + this.lineTopSubtraction() * this.lineTopSubtraction()
        );

        return Math.abs(length);
    }

    lineLeftSubtraction() {
        return this.endLeft - this.beginLeft
    }

    lineTopSubtraction() {
        return this.endTop - this.beginTop
    }

    setAngle () {
        return Math.atan2(this.lineTopSubtraction(), this.lineLeftSubtraction()) * 180 / Math.PI;
    }
}

