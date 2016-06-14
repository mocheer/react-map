import React from 'react';
import {Map}  from './Map';
import {MapState}  from './MapState';
import {MapOptions}  from './MapOptions';
/**
 * 
 */
export const MapBox = React.createClass({
    getDefaultProps: function () {
        return MapOptions;
    },
    getInitialState: function(){
        return {
            width:this.props.width,
            height:this.props.height,
        };
    },
    componentWillMount:function() {
        MapState.setState(this.props);
    },
    componentDidMount: function(){
        window.addEventListener('resize', this.handleResize);
    },
    shouldComponentUpdate:function(newProps, newState) {
        var state = this.state;
        var shouldUpdate = newState.width!==state.width || newState.height!==state.height;
        if(shouldUpdate === flase){
            shouldUpdate = newProps.width!==state.width || newProps.height!==state.height;
        }
        return shouldUpdate;
    },
    componentWillUpdate:function(nextProps, nextState) {
        if(this.props!==nextProps){
           MapState.setState(this.props);
        }else{
           MapState.setState(nextState);
        }
    },
    handleResize: function(event) {
       
    },
    render: function() {
        return (
           <div className="mapbox">
                <Map></Map>
           </div>
       );
    }
});