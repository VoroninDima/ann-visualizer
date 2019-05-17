import mainConfig from 'configs/components/main'
//
// export default class MouseMovePositionGetter {
//     constructor(props, e) {
//         this.props = props;
//         this.e = e;
//     }
//
//     getter() {
//
//         return this.netMoving()
//     }
//
//     onMouseDown(e) {
//         if (!e.ctrlKey) return;
//
//         netMoving.bind(this)(e);
//         netMovingSetToNull.bind(this)()
//     }
//
//     netMoving() {
//         const {defZoomValue} = mainConfig;
//
//         const zoomValue = this.props.sliderValue/defZoomValue;
//
//         this.coordX = this.e.pageX;
//         this.coordY = this.e.pageY;
//
//         this.posX = this.props.state.left*zoomValue;
//         this.posY = this.props.state.top*zoomValue;
//
//         window.onmousemove = () => {
//             const left = this.netMovingPositionCalculate().left/zoomValue;
//             const top = this.netMovingPositionCalculate().top/zoomValue;
//
//             return {left, top}
//         };
//     }
//
//     netMovingPositionCalculate() {
//         let left = (e.clientX - this.coordX + this.posX);
//         let top = (e.clientY - this.coordY + this.posY);
//
//         return {left, top}
//     }
//
//     netMovingSetToNull() {
//         window.onmouseup = () => window.onmousemove = null;
//         window.onkeyup = () => window.onmousemove = null
//     }
//
// }

export function onMouseDown(e) {
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

