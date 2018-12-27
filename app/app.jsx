import React, {Component} from 'react' ;
import {render} from 'react-dom';
import {NeuronList} from './components/neuron-list/NeuronList';

let xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();

let nika = JSON.parse(xhr.responseText);
class App extends Component {
	static returnLists() {
        return nika.map((list, key) =>
            <NeuronList key={key} list = {list} />
        );
	}
	render() {
        return App.returnLists()
	}
}
render(<App />, document.getElementById('app'));