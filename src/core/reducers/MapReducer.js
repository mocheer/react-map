import {PAN_TO,ZOOM_IN,ZOOM_OUT,ZOOM_TO} from '../actions/MapActions'
/**
 * 地图参数：初始化参数/状态
 */
const mapOptions ={
    width:null,
    height:null,
    source:null,
    center:null,
    zoom:null,
    extent:null
}
/**
 * 
 */
export function MapReducer(state = mapOptions, action){
    switch(action.type){
        case PAN_TO:
            return Object.assign({},state,{center:action.center})
        case ZOOM_IN:
        case ZOOM_OUT:
        case ZOOM_TO:
            const {zoom,center} = action;
            return Object.assign({},state,{zoom:zoom,center:center})
        default:
           return state;
    }
};