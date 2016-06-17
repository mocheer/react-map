import {combineReducers} from 'redux';
import {MapReducer} from './reducers/MapReducer';
import {ControlReducer} from './reducers/ControlReducer';

const rootReducer = combineReducers({
    mapOptions:MapReducer,
    controlOptions:ControlReducer
})
export default rootReducer;