import React from 'react';
import {Map}  from './Map.jsx';

/**
 * 
 */
export const MapBox = React.createClass({
    getDefaultProps : function () {
        return {
            width:0,
            height:0,
            zoom:0,
            minZoom:0,
            maxZoom:20,
            doubleClickZoom:true
        };
    },
    getInitialState: function(){
        return {
            width:this.props.width,
            height:this.props.height,
            provider:this.props.provider,
            center:this.props.center,//[]
            zoom:this.props.zoom,
            minZoom:this.props.minZoom,
            maxZoom:this.props.maxZoom,
            doubleClickZoom:this.props.doubleClickZoom
        };
    },
    componentDidMount: function(){
        window.addEventListener('resize', this.handleResize);
    },
    handleResize: function(event) {
       
    },
    render: function() {
        var state = this.state;
        var width = state.width;
        var height = state.height;
        if(!width || !height){
            return null;
        }
        return (
           <div className="mapbox">
                <Map width={width} height={height} provider={state.provider} center={state.center} zoom={state.zoom} ></Map>
           </div>
       );
    }
});