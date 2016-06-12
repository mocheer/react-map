import React from 'react';
import {TilePool}  from './utility/TilePool.jsx';
import {MapActions}  from './actions/MapActions.js';
var tile;
/**
 * 
 */
export const Map = React.createClass({
    getDefaultProps : function () {
        return {
            downPoint:[]
        };
    },
    getInitialState: function(){
        return {
            width:this.props.width,
            height:this.props.height,
            provider:this.props.provider,
            center:this.props.center,
            zoom:this.props.zoom
        };
    },
    handleDrag: function(event) {
        var downPoint = this.props.downPoint;
        var offset = [event.clientX-downPoint[0], event.clientY-downPoint[1]];
        downPoint[0] = event.clientX;
        downPoint[1] = event.clientY;
        var lonlat = this.getOffsetLonlat(offset);
        this.setState({center:[lonlat.lon,lonlat.lat]});
    },
    handleDown: function(event){
        var map = this.refs.map;
        var downPoint = this.props.downPoint;
        downPoint[0] = event.clientX;
        downPoint[1] = event.clientY;
        map.onmousemove = this.handleDrag;
        map.onmouseup = function(event){
            map.onmousemove = null;
            map.onmouseup = null;
        }
    },
    handleMouseWheel: function(event){
        var delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail/3;
        }else if(event.deltaY){
            delta = event.deltaY>0?-1:1;
        }
        if(delta!==0){
            var state = this.state;
            var zoom = parseInt(state.zoom)+delta;
            if(zoom<1){
                zoom = 1;
            }else if(zoom>20){
                zoom = 20;
            }
            var map = this.refs.map;
            var scale = delta>0?0.5:2;
            var offset = [(state.width*0.5 - event.clientX)*scale,(state.height*0.5 - event.clientY)*scale];//缩放基点的屏幕坐标
            // map.style.transformOrigin= (event.clientX/state.width).toPercent()+" "+(event.clientY/state.height).toPercent(); //动态设置基点
            // $(map).animateCss(delta>0?'zoomIn':'zoomOut');
            var lonlat = this.getOffsetLonlat(offset);//缩放基点的经纬度
            // MapActions.zoomAction([lonlat.lon,lonlat.lat],zoom);
            this.setState({center:[lonlat.lon,lonlat.lat],zoom:zoom});
        }   
    },
     getOffsetLonlat:function(offset){
        var realMaxCoordinate = tile.realMaxCoordinate;
        var scaleValue = tile.scaleValue;
        var column = realMaxCoordinate.column - offset[0]/scaleValue;
        var row = realMaxCoordinate.row - offset[1]/scaleValue;
        var coordinate = realMaxCoordinate.clone();
        coordinate.row = row;
        coordinate.column = column;
        var lonlat = tile.provider.coordinateLocation(coordinate);
        return lonlat;
    },
    render: function() {
        var state = this.state;
        var server = new MapServer(state.provider);
        var tilePool = new TilePool(server,state);
        var tiles = tilePool.getTiles();
        tile = tilePool.tile;
        return (
            <div className="map" ref="map" onWheel={this.handleMouseWheel} onMouseDown={this.handleDown} >
                {tiles}
            </div>
        );
    }
});



