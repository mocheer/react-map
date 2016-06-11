import React from 'react';


export const Tile = React.createClass({
    handleDragStart:function(){
        return false;
    },
    render: function() {
        var urls = this.props.urls;
        var len = urls.length;
        var style = {top:this.props.y,left:this.props.x};
        if(len===1){
            return <img src={urls[0]} className="tile"  style={style} draggable="false" onDragStart={this.handleMouse}  />
        }
        var imgs = [];
        for (var index = 0; index < len; index++) {
            imgs.push(<img src={urls[index]} draggable="false" onDragStart={this.handleMouse}  />)
        }
        return (
           <div className="tile" style={style}  >
                {imgs}
           </div>
       );
    }
});