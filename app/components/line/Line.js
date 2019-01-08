import Main from 'components/main/Main';
import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'


class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false,
            isActive: false,
            popupPos: null
        };
        this.ref = React.createRef();
    }


    zIndexIncrease = () => {
        this.ref.current.parentElement.style.zIndex = '111'
    };

    zIndexDecrease = () => {
        this.ref.current.parentElement.style.zIndex = '0'
    };


    getPosition = () => {
        const {lineData, lineEndsOffsetTop, neuronSize} = this.props;
        const {neuronProperties} = lineData;
        const {neuronOffsetTop, neuronOffsetLeft, nextNeuronOffsetLeft} = neuronProperties;
        this.aOffsetTop = neuronOffsetTop;
        this.aOffsetLeft = neuronOffsetLeft+neuronSize;
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
        if (this.setClassName() === lineClassSelected) return 'red';
        if (isActive) return 'red';
        if (hideHeatMap) return '#bdbdbd';

        else return this.setLineColor()
    };

    setStyle = () => {
        let lineStyle = {
            display: 'block',
            backgroundColor: this.color(),
            height: this.setLineHeight(),
            zIndex: 0,
            width: this.getPosition().width,
            transform: `rotate(${this.getPosition().angle}deg)`
        };
        if(!this.props.btnActive) lineStyle.display = 'none';
        if(this.state.weightsShow) {lineStyle.backgroundColor = 'red'; lineStyle.zIndex= 111;}

        return lineStyle
    };

    setLineHeight = () => {
        const {weightsToSize, lineSize} = this.props;
        if (weightsToSize) return lineSize + this.getLineWeights()/2-1;
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

    handleMouseOver = (e) => {
        this.showWeights();
        this.zIndexIncrease();
        this.setPopupPosition(e)
    };

    handleMouseOut = () => {
        this.hideWeights();
        this.zIndexDecrease()
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
        const rect = e.target.getBoundingClientRect();
        const angle = this.getPosition().angle;
        let top = Math.pow(e.clientY-rect.top, 2);
        if (angle < 0) top = Math.pow(e.clientY-rect.bottom, 2);
        const left = Math.pow(e.clientX-rect.left, 2);
        let popupPos = Math.sqrt(top+left) - 50;
        if (angle < 0) popupPos = popupPos - 20;
        this.setState({ popupPos })
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
        weightsToSize: state.lineWeightsToSize.isActive
    })
)(Line);