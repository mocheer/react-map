import React from 'react';
import {MapState}  from '../MapState';
import {MapStore}  from '../MapStore';

export const TileLayer = React.createClass({
    getInitialState: function(){
        return {
           tiles:MapState.getTiles()
        };
    },
    componentDidMount: function(){
        MapStore.subscribe(this.onChange);
    },
    onChange: function(){
        var nextState = MapStore.getState();
        if (nextState.hasOwnProperty("center") || nextState.hasOwnProperty("zoom")) {
            MapState.setState(nextState);
        }
        this.setState({tiles:MapState.getTiles()});
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