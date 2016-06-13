/**
 * 
 */
export const MapReducer = function(state, action){
    switch(action.type){
        case 'panTo':
           return action.state;
        case 'zoomTo':
           return action.state;
        default:
           return state;
    }
};