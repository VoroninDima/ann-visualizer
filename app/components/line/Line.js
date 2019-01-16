import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'
import getPos from './getLinePosition'


class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false,
            isActive: false,
            popupPos: null,
        };
        this.ref = React.createRef();
        this.setStyle();

    }

    zIndexChange(zIndex) {
        this.ref.current.style.zIndex = zIndex;
    }

    prevLinesChangeZIndex = () => {
        if (this.prevLineCheck() || this.props.isActive) return 1;
    };

    color = () => {
        const {isActive, hideHeatMap} = this.props;
        if (this.prevLineCheck())
            return this.changeSelectedColor();
        if (isActive)
            return this.changeSelectedColor();
        if (hideHeatMap)
            return '#bdbdbd';
        else
            return this.setLineColor()
    };

    prevLineCheck = () => {
        if (this.setClassName() === this.props.lineClassSelected) return true;
    };

    setStyle = () => {

        let lineStyle = {
            display: 'block',
            backgroundColor: this.color(),
            height: this.setLineHeight(),
            width: getPos.bind(this)().width,
            transform: `rotate(${getPos.bind(this)().angle}deg)`,
            zIndex: this.prevLinesChangeZIndex()
        };
        if(!this.props.btnActive) lineStyle.display = 'none';
        if(this.state.weightsShow) {
            lineStyle.backgroundColor = this.changeSelectedColor();
        }

        return lineStyle
    };

    setLineHeight = () => {
        const {weightsToSize, lineSize} = this.props;
        if (weightsToSize) return lineSize + this.getLineWeights()/3;
        return lineSize
    };

    setLineColor = () => {
        const redColor = () => Math.floor((this.getLineWeights()/10) * 500);
        const greenColor = () => Math.floor((1 - this.getLineWeights()/10) * 500);
        return `rgb(${redColor()}, ${greenColor()}, 0)`
    };

    getLineWeights = () => {
        const {neuronNextNum, neuronOrderNum, neuronListNum} = this.props;
        return this.props.weights.weights[neuronListNum][neuronOrderNum][neuronNextNum]
    };

    changeSelectedColor = () => {
        if (!this.props.hideHeatMap) return 'white';
        return 'red'

    };

    handleMouseOver = e => {
        if (e.ctrlKey) return;

        this.toggleWeights(true);
        this.zIndexChange(1);
        this.changeSelectedColor('white');
        if (e.target.classList.value === 'line') {
            this.setPopupPosition(e)
        }
    };

    handleMouseOut = () => {
        this.toggleWeights(false);
        this.zIndexChange(0);
        this.changeSelectedColor('red');

    };

    setClassName = () => {
        const {listName, neuronNextNum, getNextListName} = this.props;
        return `from_${listName}_to_${getNextListName}_num_${neuronNextNum+1}`

    };

    toggleWeights = (boolean) => {
        this.setState({
            weightsShow: boolean
        })
    };

    setPopupPosition = (e) => {
        const zoomValue = this.props.sliderValue/50;
        const rect = e.target.getBoundingClientRect();
        const angle = getPos.bind(this)().angle;
        let top = Math.pow((e.clientY-rect.top)/zoomValue, 2);
        const left = Math.pow((e.clientX-rect.left)/zoomValue, 2);

        if (angle < 0)
            top = Math.pow((rect.bottom-e.clientY)/zoomValue, 2);

        let popupPos = Math.sqrt(top+left) ;

        if (angle < 0)
            popupPos = popupPos - 20;

        this.setState({ popupPos });
    };

    render() {
        return (
            <div
                ref={this.ref}
                style={this.setStyle()}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                className='line'>

                <LinePopup active={this.state.weightsShow}
                           rotate={getPos.bind(this)().angle}
                           weightsValue={this.getLineWeights()}
                           popupPos={this.state.popupPos} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        btnActive: !state.hideBtnClick.btnActive,
        lineSize: state.changeSettings.lineSize,
        weights: state.weightsValue,
        lineClassSelected: state.changeLineColor.lineClassName,
        hideHeatMap: state.hideHeatMap.isActive,
        weightsToSize: state.lineWeightsToSize.isActive,
        sliderValue: state.changeSize.sliderValue
    }
}
export default connect(mapStateToProps)(Line)


