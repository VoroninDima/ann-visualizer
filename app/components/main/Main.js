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
        this.moveMain = this.moveMain.bind(this);

    }
    renderMain() {
        const {nika, neuronColor} = this.props;
        let neuronListNum = -1;
        const lists = nika.map((list, key) => {
            neuronListNum = neuronListNum + 1;
            return (
                <NeuronList neuronListNum={neuronListNum} neuronColor={neuronColor} key={key} list = {list} />
            )
        });
        return lists
    }
    moveMain(e) {
        if(e.ctrlKey) {
            e.preventDefault();
            const coordX = e.clientX;
            const coordY = e.clientY;
            const posX = this.state.left;
            const posY = this.state.top;
            window.onmousemove = e => {
                let left = e.clientX-coordX+posX;
                let top = e.clientY-coordY+posY;

                this.setState({
                    left,
                    top
                });
            };
            window.onmouseup = () => window.onmousemove = null
        }
    }

    render() {

        const style = {

            transform: `scale(${this.props.sliderValue/50}) translate(${this.state.left}px, ${this.state.top}px)`
        };
        return (
            <div onMouseDown={this.moveMain} style={style} className="main">
                {this.renderMain()}
            </div>
        )
    }
}



export default connect(
    state => ({
        sliderValue: state.changeSize.sliderValue
    })

)(Main)