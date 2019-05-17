import LinePositionGetter from './LinePositionGetter';

export default class StyleGetter {
    constructor(props, lineData) {
        this.props = props;
        this.lineData = lineData
    }

    getter() {
        return this.setStyle()
    }

    setStyle() {
        const linePositionGetter = new LinePositionGetter(this.props);
        const {weightsShow, changeSelectedColor} = this.lineData;

        const {width, angle} = linePositionGetter.getter();

        const lineStyle = {
            display: 'block',
            backgroundColor: this.color(),
            height: this.setLineHeight(),
            width,
            transform: `rotate(${angle}deg)`,
            zIndex: this.prevLinesChangeZIndex()
        };

        if(!this.props.btnActive)
            lineStyle.display = 'none';

        if(weightsShow)
            lineStyle.backgroundColor = changeSelectedColor;

        return lineStyle
    }

    prevLinesChangeZIndex() {
        const {prevLineCheck} = this.lineData;

        if (prevLineCheck || this.props.isActive) return 1;
    }

    setLineHeight() {
        const {weightsToSize, lineSize} = this.props;
        const {getLineWeights} = this.lineData;

        if (weightsToSize)
            return lineSize + getLineWeights/3;
        else
            return lineSize
    }

    color() {
        const {prevLineCheck, changeSelectedColor} = this.lineData;
        const {isActive, hideHeatMap} = this.props;

        if (prevLineCheck)
            return changeSelectedColor;

        if (isActive)
            return changeSelectedColor;

        if (hideHeatMap)
            return '#bdbdbd';

        else
            return this.setLineColor()
    }

    setLineColor() {
        const {getLineWeights} = this.lineData;

        const redColor = () => Math.floor((getLineWeights/10) * 500);
        const greenColor = () => Math.floor((1 - getLineWeights/10) * 500);
        return `rgb(${redColor()}, ${greenColor()}, 0)`
    }

}
