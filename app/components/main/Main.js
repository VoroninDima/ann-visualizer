import React from 'react'
import {connect} from 'react-redux';
import {NeuronList} from 'components/neuron-list';



function Main (props) {
    const {nika, sliderValue, neuronColor} = props;
    let neuronListNum = -1
    const lists = nika.map((list, key) => {
        neuronListNum = neuronListNum + 1;
        return (
            <NeuronList neuronListNum={neuronListNum} neuronColor={neuronColor} key={key} list = {list} />
        )
    } );
    const style = {
        transform: `scale(${sliderValue/50})`
    };
    return (
        <div style={style} className="main">
            {lists}
        </div>
    )
}



export default connect(
    state => ({
        sliderValue: state.changeSize.sliderValue
    })

)(Main)