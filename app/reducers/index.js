import {combineReducers} from 'redux';
import changeSize from './sliderChange';
import hideBtnClick from './hideBtnClick'

const rootReducer = combineReducers({
    hideBtnClick,
    changeSize

});
export default rootReducer