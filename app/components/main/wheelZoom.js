function wheelZoom(e) {
    const scrollValue = e.deltaY;
    const zoomValue = this.props.sliderValue;
    let newZoomValue = zoomValue + scrollValue/10;
    if (newZoomValue < 20 && scrollValue < 0)
        return;
    if (newZoomValue > 300 && scrollValue > 0)
        return;
    this.props.setSliderValue(newZoomValue);
    wheelZoomTranslate.bind(this)(e)
}

function wheelZoomTranslate(e) {
    this.scrollValue = e.deltaY/100;
    this.zoomValue = this.props.sliderValue/50;
    const {left, top} = this.state;
    const newLeft = getXResize.bind(this)(e) + left;
    const newTop = getYResize.bind(this)(e) + top;
    this.setState({top: newTop, left: newLeft});
}

function getXResize(e) {
    return this.scrollValue * wheelZoomGetCenterX.bind(this)(e) / 7 / this.zoomValue;
}

function getYResize(e) {
    return this.scrollValue * wheelZoomGetCenterY.bind(this)(e) / 7 / this.zoomValue;
}

function wheelZoomGetCenterX(e) {
    const centerX = this.ref.current.offsetWidth/2 + 200;
    let x = e.clientX;
    return centerX-x
}

function wheelZoomGetCenterY(e) {
    const centerY = this.ref.current.offsetHeight/2;
    let y = e.clientY;
    return centerY-y
}

export default wheelZoom