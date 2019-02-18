import {combineReducers} from 'redux';
import changeSize from './sliderChange';
import hideBtnClick from './hideBtnClick'
import changeSettings from './changeSettings'
import weightsValue from './weightsValue'
import changeLineColor from './changeLineColor'
import hideHeatMap from './hideHeatMap'
import lineWeightsToSize from './lineWeightsToSize'
import setNetworkStructure from './setNetworkStructure'
import setWeightsValue from './setWeightsValue'

const rootReducer = combineReducers({
    hideBtnClick,
    changeSize,
    changeSettings,
    weightsValue,
    changeLineColor,
    hideHeatMap,
    setNetworkStructure,
    lineWeightsToSize,
    setWeightsValue

});
export default rootReducer