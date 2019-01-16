import React, {Component} from 'react'
import {connect} from 'react-redux';
import {NeuronList} from 'components/neuron-list';
import actionChangeSize from '../../actions/actionChangeSize';
import zoom from './wheelZoom'
import moveNetwork from './moveNetwork'

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
        moveNetwork.bind(this)(e)
    };


    wheelZoom = (e) => {
        zoom.bind(this)(e)

    };

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
    };

    render() {
        const transform = this.setNetTransform();
        const style = {
            transform,
            width: this.props.netWidth,
            display: `flex`
        };
        return (
            <div style={this.parentStyle()} ref={this.ref} onWheel={this.wheelZoom.bind(this)}>
                <div
                    onMouseDown={this.onMouseDown}
                    style={style}
                    className="main">
                    {this.renderMain()}
                </div>
            </div>
        )
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

