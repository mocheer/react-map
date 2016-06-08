import React from 'react';
import {Map}  from './Map.jsx';

var downPoint;
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
    handleDrag: function(event) {
        var offset = [event.clientX-downPoint[0], event.clientY-downPoint[1]];
        var lonlat = this.getOffsetLonlat(offset);
        downPoint = [event.clientX,event.clientY];
        this.setState({center:[lonlat.lon,lonlat.lat]});
    },
    handleDown: function(event){
        var mapbox = this.refs.mapbox;
        downPoint = [event.clientX,event.clientY];
        mapbox.onmousemove = this.handleDrag;
        mapbox.onmouseup = function(event){
            mapbox.onmousemove = null;
            mapbox.onmouseup = null;
        }
    },
    getOffsetLonlat:function(offset){
        var tile = this.refs.grid.props.tile;
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
    handleMouseWheel: function(event){
        var state = this.state;
        var offset = [state.width*0.5 - event.clientX,state.height*0.5 - event.clientY];
        var lonlat = this.getOffsetLonlat(offset);
        //
        var delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail/3;
        }else if(event.deltaY){
            delta = event.deltaY>0?-1:1;
        }
        console.log(event)
        var zoom = parseInt(state.zoom)+(delta);
        if(zoom<1){
            zoom = 1;
        }else if(zoom>20){
            zoom = 20;
        }
        if(state.zoom!=zoom){
            this.setState({center:[lonlat.lon,lonlat.lat],zoom:zoom});
        }
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
        var tile = server.getMapTile(center[0],center[1],state.zoom);
        return (
           <div className="mapbox" ref="mapbox" onWheel={this.handleMouseWheel} onMouseDown={this.handleDown}   >
                <Map ref="grid" width={width} height={height} tile={tile} ></Map>
           </div>
       );
    }
});