import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false
        };
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
            transform: `rotate(${this.getPosition().angle}deg)`
        };
        if(!this.props.btnActive) lineStyle.display = 'none';
        if(this.state.weightsShow) lineStyle.backgroundColor = 'red';

        return lineStyle
    };
    getLineWeights = () => {
        const {neuronNextNum, neuronOrderNum, neuronListNum} = this.props;
        return this.props.weights.weights[neuronListNum][neuronOrderNum][neuronNextNum]
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
            <div style={this.setStyle()}
                 onMouseOver={this.showWeights}
                 onMouseOut={this.hideWeights}
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