import React, {Component} from 'react' ;
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Header from 'components/header/Header';
import Main from 'components/Main/Main';
import rootReducer from './reducers/index';
import {RandColorGenerator} from './lib/RandColorGenerator';

let xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();



const store = createStore(rootReducer);
const nika = JSON.parse(xhr.responseText);
class App extends Component {
    static getNeuronColor() {
        let randomColorArray = []
        for (let i = 0; i < nika.length; i++) {
            const randomColor = RandColorGenerator();
            randomColorArray.push(randomColor)
        }
        return randomColorArray
    }
	render() {
        return (
            <Provider store={store}>
                <div className='app'>
                    <Header/>
                    <Main neuronColor={App.getNeuronColor()} nika={nika}/>
                </div>
            </Provider>
        )
    }
}
render(<App />, document.getElementById('app'));