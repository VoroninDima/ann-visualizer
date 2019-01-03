import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false
        };
        this.ref = React.createRef();

    }

    zIndexIncrease = () => {
        this.ref.current.parentElement.style.zIndex = '111'
    };

    zIndexDecrease = () => {
        this.ref.current.parentElement.style.zIndex = '0'
    }

    getPosition = () => {
        const {lineData, lineEndsOffsetTop} = this.props;
        const {lineBgc, neuronProperties} = lineData;
        this.selectedColor = lineBgc;
        this.aOffsetTop = neuronProperties.neuronOffsetTop;
        this.aOffsetLeft = neuronProperties.neuronOffsetLeft+this.props.neuronSize;
        this.bOffsetTop = lineEndsOffsetTop-this.props.neuronSize;
        this.bOffsetLeft = neuronProperties.nextNeuronOffsetLeft;
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

    setStyle = () => {
        let lineStyle = {
            display: 'block',
            backgroundColor: this.selectedColor,
            height: this.props.lineSize,
            width: this.getPosition().width,
            zIndex: 1,
            transform: `rotate(${this.getPosition().angle}deg)`
        };
        if(!this.props.btnActive) lineStyle.display = 'none';
        if(this.state.weightsShow) {lineStyle.backgroundColor = 'red'; lineStyle.zIndex = 11}

        return lineStyle
    };

    getLineWeights = () => {
        const {neuronNextNum, neuronOrderNum, neuronListNum} = this.props;
        return this.props.weights.weights[neuronListNum][neuronOrderNum][neuronNextNum]
    };

    handleMouseOver = () => {
        this.showWeights();
        this.zIndexIncrease()
    };

    handleMouseOut = () => {
        this.hideWeights();
        this.zIndexDecrease()
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
    render() {
        this.setStyle();
        return (
            <div
                ref={this.ref}
                style={this.setStyle()}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                className="line">
                <LinePopup active={this.state.weightsShow}
                           rotate={this.getPosition().angle}
                           weightsValue={this.getLineWeights()}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        btnActive: !state.hideBtnClick.btnActive,
        lineSize: state.changeSettings.lineSize,
        weights: state.weightsValue
    })
)(Line);