import {createStore} from 'redux';
/**
 * 
 */
function MapReducer(state, action){
    switch(action.type){
        case 'panTo':
        case 'zoomIn':
        case 'zoomOut':
        case 'zoomTo':
           return action.state;
        default:
           return state;
    }
};
export const MapStore = createStore(MapReducer);