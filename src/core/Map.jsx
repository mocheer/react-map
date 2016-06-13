import React from 'react';
import {MapState}  from './MapState.js';
import {MapStore}  from './MapStore.js';
import {TileLayer}  from './layer/TileLayer.jsx';
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
        MapStore.dispatch(event);
    },
    handleMouseWheel: function(e){
        var event = MapState.scrollWheel(e);
        if(event){
            MapStore.dispatch(event);
            var map = this.refs.map;
            // map.style.transformOrigin= (e.clientX/state.width).toPercent()+" "+(e.clientY/state.height).toPercent(); //动态设置基点
            // $(map).animateCss(delta>0?'zoomIn':'zoomOut');
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



