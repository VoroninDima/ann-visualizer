import {combineReducers} from 'redux';
import changeSize from './sliderChange';
import hideBtnClick from './hideBtnClick'
import changeSettings from './changeSettings'
import weightsValue from './weightsValue'
import neuronsNames from './neuronsNames'

const rootReducer = combineReducers({
    hideBtnClick,
    changeSize,
    changeSettings,
    weightsValue,
    neuronsNames

});
export default rootReducer