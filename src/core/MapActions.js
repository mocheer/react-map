/**
 * 缩小
 */
export function zoomIn(zoom,lonlat) {
    return {type:"zoomIn",state:{zoom:zoom,center:lonlat}};
}
/**
 * 放大
 */
export function zoomOut(zoom,lonlat) {
    return {type:"zoomOut",state:{zoom:zoom,center:lonlat}};
}
/**
 * 缩放
 */
export function zoomTo(zoom,lonlat) {
    return {type:"zoomTo",state:{zoom:zoom,center:lonlat}};
}
/**
 * 漫游
 */
export function panTo(lonlat) {
    return {type:"panTo",state:{center:lonlat}};
}
/**
 * 地图大小改变
 */
export function resize(w,h){
    return {type:"resize",state:{width:w,height:h}};
}
