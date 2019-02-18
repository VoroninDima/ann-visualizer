import {setAngle, setWidth} from 'components/line/lineMethods/getLinePosition';
import color from 'components/line/lineMethods/setLineColor';


function prevLinesChangeZIndex() {
    if (this.prevLineCheck() || this.props.isActive) return 1;
}

function setStyle() {
    const lineStyle = {
        display: 'block',
        backgroundColor: color.bind(this)(),
        height: setLineHeight.bind(this)(),
        width: setWidth.bind(this)(),
        transform: `rotate(${setAngle.bind(this)()}deg)`,
        zIndex: prevLinesChangeZIndex.bind(this)()
    };

    if(!this.props.btnActive)
        lineStyle.display = 'none';

    if(this.state.weightsShow)
        lineStyle.backgroundColor = this.changeSelectedColor();

    return lineStyle
}

function setLineHeight() {
    const {weightsToSize, lineSize} = this.props;

    if (weightsToSize)
        return lineSize + this.getLineWeights()/3;
    else
        return lineSize
}

export default setStyle