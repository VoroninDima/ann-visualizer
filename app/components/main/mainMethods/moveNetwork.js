import mainConfig from 'configs/components/main'

class Move {

}

function onMouseDown(e) {
    if (!e.ctrlKey) return;

    netMoving.bind(this)(e);
    netMovingSetToNull.bind(this)()
}

function netMoving(e) {
    const {defZoomValue} = mainConfig;

    const zoomValue = this.props.sliderValue/defZoomValue;

    this.coordX = e.pageX;
    this.coordY = e.pageY;

    this.posX = this.state.left*zoomValue;
    this.posY = this.state.top*zoomValue;

    window.onmousemove = e => {
        const left = netMovingPositionCalculate.bind(this)(e).left/zoomValue;
        const top = netMovingPositionCalculate.bind(this)(e).top/zoomValue;

        this.setState({ left, top });
    };
}

function netMovingPositionCalculate(e) {
    let left = (e.clientX - this.coordX + this.posX);
    let top = (e.clientY - this.coordY + this.posY);

    return {left, top}
}

function netMovingSetToNull() {
    window.onmouseup = () => window.onmousemove = null;
    window.onkeyup = () => window.onmousemove = null
}

export default onMouseDown;