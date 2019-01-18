function getNeuronPosition() {
    const ref = this.ref.current;
    const refNext = ref.parentElement.parentElement.nextElementSibling;
    setTimeout(() => {
        const nextNeuronOffsetTop = refNext.offsetTop;
        const nextNeuronOffsetLeft = refNext.offsetLeft;
        const neuronWidth = 30;
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