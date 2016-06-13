import {MapStore}  from './MapStore.js';
import {MapOptions}  from './MapOptions.js';
class State{
    constructor() { //构造函数
        this.options = MapOptions;
        this.downPoint = null;
    }
    setState(newState){
        for (var key in newState) {//in会检测到原形链上的其他属性方法
            if (newState.hasOwnProperty(key)) {
                var value = newState[key];
                if(this.options[key] !== value){
                    this.options[key] = value;
                }
            }
        }
    }
    //mouse-action
     mousedown(e){
        this.downPoint = [e.clientX,e.clientY];
    }
     mouseup(e){
        this.downPoint = null;
    }
     mousedrag(e){
        var downPoint = this.downPoint;
        if(downPoint){
            var offset = [e.clientX-downPoint[0], e.clientY-downPoint[1]];
            var tilePool = this.options.tilePool;
            var lonlat = tilePool.getOffsetLonlat(offset);
            downPoint[0] = e.clientX;
            downPoint[1] = e.clientY;
            lonlat = [lonlat.lon,lonlat.lat];
            return this.panTo(lonlat);
        }
    }
     scrollWheel(e){
        var delta = 0;
        if (e.wheelDelta) {
            delta = e.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (e.detail) {
            delta = -e.detail/3;
        }else if(e.deltaY){
            delta = e.deltaY>0?-1:1;
        }
        if(delta!==0){
            var options = this.options;
            var zoom = parseInt(this.options.zoom) + delta;
            if(zoom<1){
                zoom = 1;
            }else if(zoom>20){
                zoom = 20;
            }
            var tilePool = this.options.tilePool;
            var scale = delta>0?0.5:2;
            var offset = [(options.width*0.5 - e.clientX)*scale,(options.height*0.5 - e.clientY)*scale];//缩放基点的屏幕坐标
            var lonlat = tilePool.getOffsetLonlat(offset);//缩放基点的经纬度
            lonlat = [lonlat.lon,lonlat.lat];
            return this.zoomTo(zoom,lonlat);
        }
        return null;
    }
    //map-action
    /**
     * 缩放
     */
     zoomTo(zoom,lonlat) {
        return {type:"zoomTo",state:{zoom:zoom,center:lonlat}};
    }
    /**
     * 漫游
     */
     panTo(lonlat) {
        return {type:"panTo",state:{center:lonlat}};
    }
    /**
     * 地图大小改变
     */
     resize(){
        return {type:"resize"};
    }
}
export var MapState = new State();