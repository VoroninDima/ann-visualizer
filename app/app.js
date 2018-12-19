import React, {Component} from 'react' ;
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {NeuronList} from './components/neuron-list';
import {Header} from 'components/header';

let xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();

const initialState = {
    btnText: 'Hide lines',
    btnActive: false
};
function btnText(state=initialState, action) {
    if (action.type === 'changeText') {
        return {
            btnText: action.payload,
            btnActive: !state.btnActive
        };
    }
    return state
}

const store = createStore(btnText);
let nika = JSON.parse(xhr.responseText);
let lists;
class App extends Component {
    static returnLists() {
        lists = nika.map((list, key) =>
            <NeuronList key={key} list = {list} />
        );
        return lists
	}
	render() {
        return (
            <Provider store={store}>
                <div className='app'>
                    <Header/>
                    <div className='main'>
                        {App.returnLists()}
                    </div>
                </div>
            </Provider>
        )
    }

}
render(<App />, document.getElementById('app'));