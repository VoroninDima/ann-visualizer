import {combineReducers} from 'redux';
import changeSize from './sliderChange';
import hideBtnClick from './hideBtnClick'
import changeSettings from './changeSettings'
import weightsValue from './weightsValue'
import neuronsNames from './neuronsNames'
import changeLineColor from './changeLineColor'

const rootReducer = combineReducers({
    hideBtnClick,
    changeSize,
    changeSettings,
    weightsValue,
    neuronsNames,
    changeLineColor

});
export default rootReducer