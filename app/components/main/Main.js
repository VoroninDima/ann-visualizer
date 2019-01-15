import React, {Component} from 'react'
import {connect} from 'react-redux';
import {NeuronList} from 'components/neuron-list';
import actionChangeSize from '../../actions/actionChangeSize';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
            top:0
        };
    }


    renderMain() {
        const {nika, neuronColor} = this.props;
        let neuronListNum = -1;
        return nika.map((list, key) => {
            neuronListNum = neuronListNum + 1;
            return (
                <NeuronList
                    neuronListNum={neuronListNum}
                    neuronColor={neuronColor}
                    key={key}
                    list = {list}
                />
            )
        });
    }

    onMouseDown = (e) => {

        e.preventDefault();
        const zoomValue = this.props.sliderValue/50;
        const coordX = e.pageX;
        const coordY = e.pageY;
        const posX = this.state.left*zoomValue;
        const posY = this.state.top*zoomValue;

        if (!e.ctrlKey) return;

        window.onmousemove = e => {
            let left = (e.clientX - coordX + posX)/zoomValue;
            let top = (e.clientY - coordY + posY)/zoomValue;
            this.setState({ left, top });
        };

        window.onmouseup = () => window.onmousemove = null;
        window.onkeyup = () => window.onmousemove = null
    };

    wheelZoom = (e) => {
            if (!e.altKey) return;
            const zoomValue = this.props.sliderValue;
            let newZoomValue = zoomValue + e.deltaY/10;
            if (newZoomValue < 20) newZoomValue=20;
            if (newZoomValue > 300) newZoomValue=300;
            this.props.setSliderValue(newZoomValue);


            // let x = e.clientX;
            // let y = e.clientY;
            // let left = this.state.left;
            // let top = this.state.top;
            // this.setState({top: e.deltaY/100*y/10+top, left: e.deltaY/100*x/10+left})
    };

    render() {
        const transform = this.setNetTransform();
        const style = {
            transform,
            width: this.props.netWidth,
            display: `flex`
        };
        return (
            <div style={this.parentStyle()}>
                <div
                    onMouseDown={this.onMouseDown}
                    onWheel={this.wheelZoom}
                    style={style}
                    className="main">
                    {this.renderMain()}
                </div>
            </div>
        )
    }

    setNetTransform() {
        const scale = this.props.sliderValue / 50;
        const {left, top} = this.state;
        return `scale(${scale}) translate(${left}px, ${top}px)`
    }

    parentStyle = () => {
        return {
            display: 'flex',
            justifyContent: 'center'
        }
    }
}

function mapStateToProps(state) {
    return {
        sliderValue: state.changeSize.sliderValue,
        netWidth: state.changeSettings.netWidth    }
}
function mapDispatchToProps(dispatch) {
    return {
        setSliderValue: sliderValue => {
            dispatch(actionChangeSize(sliderValue))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)

