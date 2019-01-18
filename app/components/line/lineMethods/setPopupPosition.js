import {setAngle} from './getLinePosition'

function setPopupPosition(e) {
    this.zoomValueKoef = this.props.sliderValue/50;
    const angle = setAngle.bind(this)();
    const rect = e.target.getBoundingClientRect();
    let popupPos = Math.sqrt(popupTopCalculate.bind(this)(e, rect)+popupLeftCalculate.bind(this)(e, rect)) ;
    if (angle < 0)
        popupPos = popupPos - 20;
    this.setState({ popupPos });
}

function popupTopCalculate(e, rect) {
    const angle = setAngle.bind(this)();
    let top = Math.pow((e.clientY-rect.top)/this.zoomValueKoef, 2);
    if (angle < 0)
        top = Math.pow((rect.bottom-e.clientY)/this.zoomValueKoef, 2);
    return top
}

function popupLeftCalculate(e, rect) {
    return Math.pow((e.clientX-rect.left)/this.zoomValueKoef, 2);
}

export default setPopupPosition