import LinePositionGetter from './LinePositionGetter'

export default class PopUpPosGetter {
    constructor(e, props) {
        this.props = props;
        this.e = e;

        const linePositionGetter = new LinePositionGetter(props);
        this.angle = linePositionGetter.getter().angle
    }

    getter() {
        return this.setPopupPosition()
    }

    setPopupPosition() {
        this.zoomValueKoef = this.props.sliderValue/50;

        const rect = this.e.target.getBoundingClientRect();

        let popupPos = Math.sqrt(
            this.popupTopCalculate(this.e, rect) +
            this.popupLeftCalculate(this.e, rect)) +
            this.angle/10;

        if (this.angle < 0)
            popupPos = popupPos - 20;

        return popupPos
    }

    popupTopCalculate(e, rect) {
        const y = e.clientY;

        let top = Math.pow((y-rect.top)/this.zoomValueKoef, 2);

        if (this.angle < 0)
            top = Math.pow((rect.bottom-y)/this.zoomValueKoef, 2);

        return top
    }

    popupLeftCalculate(e, rect) {
        return Math.pow((e.clientX-rect.left)/this.zoomValueKoef, 2);
    }
}

