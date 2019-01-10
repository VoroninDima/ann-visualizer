import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'


class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false,
            isActive: false,
            popupPos: null,
        };
        this.ref = React.createRef();
    }


    zIndexChange = (index) => {
        this.ref.current.parentElement.style.zIndex = index
    };




    getPosition = () => {
        const {lineData, lineEndsOffsetTop, neuronSize} = this.props;
        const {neuronProperties} = lineData;
        const {neuronOffsetTop, neuronOffsetLeft, nextNeuronOffsetLeft} = neuronProperties;
        this.aOffsetTop = neuronOffsetTop;
        this.aOffsetLeft = neuronOffsetLeft+neuronSize+12;
        this.bOffsetTop = lineEndsOffsetTop-neuronSize;
        this.bOffsetLeft = nextNeuronOffsetLeft;
        this.angle = Math.atan2(
            this.bOffsetTop - this.aOffsetTop,
            this.bOffsetLeft - this.aOffsetLeft
        ) * 180 / Math.PI;
        this.length = Math.sqrt(
            (this.bOffsetLeft - this.aOffsetLeft)
            * (this.bOffsetLeft - this.aOffsetLeft)
            + (this.bOffsetTop - this.aOffsetTop)
            * (this.bOffsetTop - this.aOffsetTop)
        );
        this.width = Math.abs(this.length) + 'px';

        return {angle: this.angle, width: this.width}
    };

    color = () => {

        const {lineClassSelected, isActive, hideHeatMap} = this.props;
        if (this.setClassName() === lineClassSelected) return this.changeSelectedColor();
        if (isActive) return this.changeSelectedColor();
        if (hideHeatMap) return '#bdbdbd';

        else return this.setLineColor()
    };



    setStyle = () => {
        let lineStyle = {
            display: 'block',
            backgroundColor: this.color(),
            height: this.setLineHeight(),
            width: this.getPosition().width,
            transform: `rotate(${this.getPosition().angle}deg)`
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

    handleMouseOver = (e) => {
        this.showWeights();
        this.zIndexChange(10);
        this.changeSelectedColor('white');
        if (e.target.classList.value === 'line') {
            this.setPopupPosition(e)
        }
    };

    handleMouseOut = () => {
        this.hideWeights();
        this.zIndexChange(0);
        this.changeSelectedColor('red');

    };

    setClassName = () => {
        const {listName, neuronNextNum, getNextListName} = this.props;
        return `from_${listName}_to_${getNextListName}_num_${neuronNextNum+1}`

    };

    showWeights = () => {
        this.setState({
            weightsShow: true
        })
    };

    hideWeights = () => {
        this.setState({
            weightsShow: false
        })
    };

    setPopupPosition = (e) => {
        const zoomValue = this.props.sliderValue/50;
        const rect = e.target.getBoundingClientRect();
        const angle = this.getPosition().angle;
        let top = Math.pow((e.clientY-rect.top)/zoomValue, 2);
        if (angle < 0) top = Math.pow((rect.bottom-e.clientY)/zoomValue, 2);
        const left = Math.pow((e.clientX-rect.left)/zoomValue, 2);
        let popupPos = Math.sqrt(top+left) ;
        if (angle < 0) popupPos = popupPos - 20;
        this.setState({ popupPos });
    };

    render() {
        this.setStyle();
        return (
            <div
                ref={this.ref}
                style={this.setStyle()}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                className='line'>
                <LinePopup active={this.state.weightsShow}
                           rotate={this.getPosition().angle}
                           weightsValue={this.getLineWeights()}
                           popupPos={this.state.popupPos}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        btnActive: !state.hideBtnClick.btnActive,
        lineSize: state.changeSettings.lineSize,
        weights: state.weightsValue,
        lineClassSelected: state.changeLineColor.lineClassName,
        hideHeatMap: state.hideHeatMap.isActive,
        weightsToSize: state.lineWeightsToSize.isActive,
        sliderValue: state.changeSize.sliderValue,
    })
)(Line);
