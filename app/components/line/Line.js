

import React from 'react'
import {connect} from 'react-redux';
import {LinePopup} from 'components/linePopup'

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false
        };
        this.getPosition = this.getPosition.bind(this);
        this.showWeights = this.showWeights.bind(this);
        this.getLineWeights = this.getLineWeights.bind(this);
        this.hideWeights = this.hideWeights.bind(this);

    }

    getPosition() {
        this.neuronProperties = this.props.lineData.neuronProperties,
            this.selectedColor = this.props.lineData.lineBgc,
            this.aOffsetTop = this.props.lineData.neuronProperties.neuronOffsetTop,
            this.aOffsetLeft = this.props.lineData.neuronProperties.neuronOffsetLeft+this.props.neuronSize,
            this.bOffsetTop = this.props.lineEndsOffsetTop-this.props.neuronSize,
            this.bOffsetLeft = this.props.lineData.neuronProperties.nextNeuronOffsetLeft,
            this.angle = Math.atan2(this.bOffsetTop - this.aOffsetTop, this.bOffsetLeft - this.aOffsetLeft) * 180 / Math.PI,
            this.length = Math.sqrt((this.bOffsetLeft - this.aOffsetLeft) * (this.bOffsetLeft - this.aOffsetLeft) + (this.bOffsetTop - this.aOffsetTop) * (this.bOffsetTop - this.aOffsetTop));
        this.width = Math.abs(this.length) + 'px';

        return {angle: this.angle, width: this.width}
    }
    setStyle() {

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
    }
    getLineWeights() {
        return this.props.weights.weights[this.props.neuronListNum][this.props.neuronOrderNum][this.props.neuronNextNum]
    };
    showWeights() {
        this.setState({
            weightsShow: true
        })
    }
    hideWeights() {
        this.setState({
            weightsShow: false
        })
    }
    render() {
        this.setStyle();
        return (
            <div style={this.setStyle()}
                 onMouseOver={this.showWeights}
                 onMouseOut={this.hideWeights}
                 className="line">
                <LinePopup active={this.state.weightsShow}
                           rotate={this.getPosition().angle}
                           weightsValue={this.getLineWeights()}/>
            </div>
        )
    }


}

export default connect(
    state => ({
        btnActive: !state.hideBtnClick.btnActive,
        lineSize: state.changeSettings.lineSize,
        weights: state.weightsValue,
    })

)(Line);