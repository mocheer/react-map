import React from 'react';
import {TilePool}  from './TilePool.jsx';
import {MapState}  from '../MapState.js';
import {MapStore}  from '../MapStore.js';

export const TileLayer = React.createClass({
    getInitialState: function(){
        var options = MapState.options;
        var server = new MapServer(options.provider);
        options.tilePool = new TilePool(server,options);
        return {
           tiles:options.tilePool.getTiles()
        };
    },
    componentDidMount: function(){
        MapStore.subscribe(this.onChange);
    },
    onChange: function(){
        var options = MapState.options;
        var tilePool = options.tilePool;
        var nextState = MapStore.getState();
        if (nextState.hasOwnProperty("center") || nextState.hasOwnProperty("zoom")) {
            MapState.setState(nextState);
        }
        this.setState({tiles:tilePool.getTiles()});
    },
    render: function () {
        var state = this.state;
        return (
            <div className="tilelayer" >
                {state.tiles}
            </div>
        );
    }
});