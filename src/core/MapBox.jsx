import React from 'react';
import {Map}  from './Map.jsx';

/**
 * 
 */
export const MapBox = React.createClass({
    getInitialState: function(){
        return {
            width:this.props.width,
            height:this.props.height,
            provider:this.props.provider,
            center:this.props.center,//[]
            zoom:this.props.zoom
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
        var server = new MapServer(state.provider);
        var center = state.center;
        return (
           <div className="mapbox" ref="mapbox"  >
                <Map  width={width} height={height} server={server} center={center} zoom={state.zoom} ></Map>
           </div>
       );
    }
});