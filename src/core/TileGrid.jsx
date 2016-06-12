import React from 'react';

export const TileGrid = React.createClass({
    getDefaultProps : function () {
        return {
            tiles:null
        };
    },
    getInitialState: function(){
        return {
           tiles:this.props.tiles
        };
    },
    render: function () {
        var tiles = tilePool.getTiles();
        tile = tilePool.tile;
        return (
            <div className="tilegrid" >
                {tiles}
            </div>
        );
    }
});