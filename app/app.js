import React, {Component} from 'react' ;
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Header from 'components/header/Header';
import Main from 'components/Main/Main';
import rootReducer from './reducers/index';


const store = createStore(rootReducer);
class App extends Component {

	render() {
        return (
            <Provider store={store}>
                <div className='app'>
                    <Header/>
                    <Main />
                </div>
            </Provider>
        )
    }
}
render(<App />, document.getElementById('app'));