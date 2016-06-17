/*
 * action 类型
 */
export const ZOOM_IN = 'ZOOMIN';
export const ZOOM_OUT = 'ZOOMOUT';
export const ZOOM_TO = 'ZOOMTO';
export const PAN_TO = 'PANTO';
export const RESIZE = 'RESIZE';
/**
 * 缩小
 */
export function zoomIn(zoom,lonlat) {
    return {type:ZOOM_IN,zoom:zoom,center:lonlat};
}
/**
 * 放大
 */
export function zoomOut(zoom,lonlat) {
    return {type:ZOOM_OUT,zoom:zoom,center:lonlat};
}
/**
 * 缩放
 */
export function zoomTo(zoom,lonlat) {
    return {type:ZOOM_TO,zoom:zoom,center:lonlat};
}
/**
 * 漫游
 */
export function panTo(lonlat) {
    const {lon,lat} = lonlat;
    return {type:PAN_TO,center:[lon,lat]};
}
/**
 * 地图大小改变
 */
export function resize(w,h){
    return {type:RESIZE,state:{width:w,height:h}};
}

