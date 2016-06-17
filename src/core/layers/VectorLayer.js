import React from 'react';

export const TileLayer = React.createClass({
    render: function () {
        var state = this.state;
        var markers = state.markers;
        return (
            <div className="vectorLayer" >
                {markers}
            </div>
        );
    }
});