import React, {Component} from 'react' ;
import {render} from 'react-dom';
import NeuronList from './components/neuron-list/NeuronList.jsx';

let xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();

let nika = JSON.parse(xhr.responseText)
class App extends Component {
	constructor() {
		super()
        this.returnLists = this.returnLists.bind(this)

    }

	returnLists() {
        let lists = nika.map((list, key) =>
            <NeuronList key={key} list = {list} />
        );
        return lists
	}
	render() {
        return this.returnLists()
	}
}
render(<App />, document.getElementById('app'))