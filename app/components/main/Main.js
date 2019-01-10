import React, {Component} from 'react'
import {connect} from 'react-redux';
import {NeuronList} from 'components/neuron-list';


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

        const coordX = e.clientX;
        const coordY = e.clientY;
        const posX = this.state.left;
        const posY = this.state.top;

        if (!e.ctrlKey) return;

        window.onmousemove = e => {
            let left = e.clientX - coordX + posX;
            let top = e.clientY - coordY + posY;

            this.setState({ left, top });
        };

        window.onmouseup = () => window.onmousemove = null;
        window.onkeyup = () => window.onmousemove = null
    };

    render() {
        const transform = this.setNetTransform();
        const style = {
            transform,
            width: this.props.netWidth+'%',
            display: `flex`
        };
        return (
            <div onMouseDown={this.onMouseDown} style={style} className="main">
                {this.renderMain()}
            </div>
        )
    }

    setNetTransform() {
        const scale = this.props.sliderValue / 50;
        const {left, top} = this.state;
        return `scale(${scale}) translate(${left}px, ${top}px)`
    }
}



export default connect(
    state => ({
        sliderValue: state.changeSize.sliderValue,
        netWidth: state.changeSettings.netWidth
    })

)(Main)