import neuronConfig from 'configs/components/neuron'

function getNeuronPosition() {
    const ref = this.ref.current;
    const refNext = ref.parentElement.nextElementSibling;

    setTimeout(() => {
        const {neuronWidth} = neuronConfig;

        const nextNeuronOffsetTop = refNext.offsetTop;
        const nextNeuronOffsetLeft = refNext.offsetLeft;

        const neuronOffsetLeft = ref.offsetLeft;
        const neuronOffsetTop = ref.offsetTop;

        this.setState({
            neuronProperties: {
                neuronWidth,
                neuronOffsetLeft,
                neuronOffsetTop,
                nextNeuronOffsetTop,
                nextNeuronOffsetLeft
            }
        });
    }, 0)
}

export default getNeuronPosition;