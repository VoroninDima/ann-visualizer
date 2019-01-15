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
        this.ref = React.createRef()
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
        if (!e.ctrlKey) return;

        const zoomValue = this.props.sliderValue/50;
        const coordX = e.pageX;
        const coordY = e.pageY;
        const posX = this.state.left*zoomValue;
        const posY = this.state.top*zoomValue;

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
        const scrollValue = e.deltaY
        const zoomValue = this.props.sliderValue;
        let newZoomValue = zoomValue + scrollValue/10;
        if (newZoomValue < 20 && scrollValue < 0) return;
        if (newZoomValue > 300 && scrollValue > 0) return;
        this.props.setSliderValue(newZoomValue);

        const centerX = this.ref.current.offsetWidth/2+200;
        const centerY = this.ref.current.offsetHeight/2;
        const {left, top} = this.state;
        let x = e.clientX;
        let y = e.clientY;
        let xResize = scrollValue/100*(centerX-x)/7/(zoomValue/50)+left;
        let yResize = scrollValue/100*(centerY-y)/7/(zoomValue/50)+top;
        this.setState({top: yResize, left: xResize});
    };

    render() {
        const transform = this.setNetTransform();
        const style = {
            transform,
            width: this.props.netWidth,
            display: `flex`
        };
        return (
            <div style={this.parentStyle()} ref={this.ref} onWheel={this.wheelZoom}>
                <div
                    onMouseDown={this.onMouseDown}
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

