import React from 'react';
/**
 * 
 */
export const Map = React.createClass({
    getInitialState: function(){
        return {
            provider:this.props.provider,
            center:this.props.center,
            zoom:this.props.zoom
        };
    },
    render: function() {
        var width = this.props.width;
        var height = this.props.height;
        var halftWidth = width*0.5;
        var haltHeight = height*0.5;
        var tile = this.props.tile;
        
        var zoom = tile.zoom;
        var coordinate = tile.coordinate;
        var offsetX = tile.offsetX;
        var offsetY = tile.offsetY;
        var scaleValue = tile.scaleValue;
        var urls = tile.urls;
        //
        var provider = tile.provider;
        var tileWidth = provider.tileWidth;
        var tileHeight = provider.tileHeight;
        //
        var x = halftWidth-offsetX;
        var y = haltHeight-offsetY;

        var checkState = function (){
            var len = directions.length;
            for (var index = 0; index < len; index++) {
                if(directions[index]){
                    return true;
                }
            }
            return false;
        }
        var turn = function (direaction,step) {
            coordinate = coordinate[direaction](step);
            urls = provider.getTileUrls(coordinate);
            if(urls){
                cells.push(<TileCell x={x} y={y} urls={urls} ></TileCell>)
            } 
        }
        var cells = [<TileCell x={x} y={y} urls={urls} ></TileCell>];
        var directions=[true,true,true,true];//
        var forFlag = true;
        var index = 0;//方向
        var j=1;//步速
        var z=1;//某一个方向的总步数
        var count = 0;
        var date = new Date();
        while(forFlag){
            count++;
            switch(index){//right,down,left,up
                case 0:
                    x += tileWidth;
                    turn("right")
                    if(x > width){
                        directions[0] = false;
                        forFlag = checkState();
                    }
                    break;
                case 1:
                    y += tileHeight;
                    turn("down");
                    if(y>height){
                        directions[1] = false;
                        forFlag = checkState();
                    }
                    if(j===1){
                        z++;
                    }
                    break;
                case 2:
                    x -= tileWidth;
                    turn("left")  
                    if(x<-tileWidth){
                        directions[2] = false;
                        forFlag = checkState();
                    }
                    break;
                case 3:
                    y -= tileHeight;
                    turn("up")
                    if(y<-tileHeight){
                         directions[3] = false;
                       forFlag = checkState();
                    }
                    if(j===1){
                        index = -1;//一个循环
                        z++;
                    }
                    break;
            }
            j--;
            if(j===0){
                index++;
                j=z;
            }
        }
        console.log(count,new Date() - date)
        return (
           <div className="map"  >
                {cells}
           </div>
       );
    }
});
/**
 * 
 */
const TileCell = React.createClass({
    handleDragStart:function(){
        return false;
    },
    render: function() {
        var urls = this.props.urls;
        var len = urls.length;
        var style = {top:this.props.y,left:this.props.x};
        var imgs = [];
        for (var index = 0; index < len; index++) {
            imgs.push(<img src={urls[index]} draggable="false" onDragStart={this.handleMouse}  />)
        }
        return (
           <div className="tilecell" style={style}  >
                {imgs}
           </div>
       );
    }
});