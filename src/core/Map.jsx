import React from 'react';
import {MapState}  from './MapState';
import {MapStore}  from './MapStore';
import {zoomTo,panTo}  from './MapActions';
import {TileLayer}  from './layers/TileLayer';
/**
 * 
 */
export const Map = React.createClass({
    getInitialState: function(){
        return {
            layers:null
        };
    },
    componentDidMount: function(){
        MapStore.subscribe(this.onChange);
    },
    onChange: function(){
        var state = this.state;
        var nextState = MapStore.getState();
        if(nextState.hasOwnProperty("layers")){
            this.setState(nextState);
        }
    },
    handleDown: function(e){
        MapState.mousedown(e);
        var map = this.refs.map;
        map.onmousemove = this.handleDrag;
        map.onmouseup = function(e){
            MapState.mouseup(e);
            map.onmousemove = null;
            map.onmouseup = null;
        }
    },
    handleDrag: function(e) {
        var event = MapState.mousedrag(e);
        var lonlat = MapState.getOffsetLonlat(event.offset);
        lonlat = [lonlat.lon,lonlat.lat];
        MapStore.dispatch(panTo(lonlat));
    },
    handleMouseWheel: function(e){
        var event = MapState.scrollWheel(e);
        if(event!==null){
            var offset = event.offset;
            var zoom = event.zoom;
            var lonlat = MapState.getOffsetLonlat(offset);//缩放基点的经纬度
            lonlat = [lonlat.lon,lonlat.lat];
            MapStore.dispatch(zoomTo(zoom,lonlat));
        }   
    },
    render: function() {
        return (
            <div className="map" ref="map" onWheel={this.handleMouseWheel} onMouseDown={this.handleDown} >
                <TileLayer></TileLayer>
            </div>
        );
    }
});



