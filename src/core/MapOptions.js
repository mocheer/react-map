/**
 * 地图参数：初始化参数/状态
 */
export var MapOptions ={
    //map box
    width:null,
    height:null,
    //map state
    provider:null,
    center:null,
    zoom:null,
    extent:null,
    minZoom:null,
    maxZoom:null,
    crs:"EPSG3857",
    //map interaction
    draggable:true,
    touchZoom:true,
    scrollWheelZoom:true,
    doubleClickZoom:true,
    //layer interaction
    clickable:true,
    markerdraggable:true,
    //animation
    zoomAnimation:true,
    //contorl
    zoomControl:true,
    scaleControl:true,
    navigatorControl:false
}
