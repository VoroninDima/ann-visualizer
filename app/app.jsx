import React, {Component} from 'react' ;
import {render} from 'react-dom';
import NeuronList from './components/NeuronList.jsx';

let xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();

let nika = JSON.parse(xhr.responseText)
class App extends Component {

	render() {
		return (
			<NeuronList neurons = {nika} />
			)
	}
}
render(<App />, document.getElementById('app'))