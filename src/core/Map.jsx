import React from 'react';
import {Tile}  from './Tile.jsx';

var tileCache;
var downPoint;
var tile;
/**
 * 
 */
export const Map = React.createClass({
    getInitialState: function(){
        return {
            width:this.props.width,
            height:this.props.height,
            server:this.props.server,
            center:this.props.center,
            zoom:this.props.zoom
        };
    },
    handleDrag: function(event) {
        var offset = [event.clientX-downPoint[0], event.clientY-downPoint[1]];
        var lonlat = this.getOffsetLonlat(offset);
        downPoint = [event.clientX,event.clientY];
        this.setState({center:[lonlat.lon,lonlat.lat]});
    },
    handleDown: function(event){
        var map = this.refs.map;
        downPoint = [event.clientX,event.clientY];
        map.onmousemove = this.handleDrag;
        map.onmouseup = function(event){
            map.onmousemove = null;
            map.onmouseup = null;
        }
    },
    getOffsetLonlat:function(offset){
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
        var delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail/3;
        }else if(event.deltaY){
            delta = event.deltaY>0?-1:1;
        }
       
        if(delta!==0){
            var map = this.refs.map;
            var state = this.state;
            var scale = delta>0?0.5:2;
            var offset = [(state.width*0.5 - event.clientX)*scale,(state.height*0.5 - event.clientY)*scale];
            var lonlat = this.getOffsetLonlat(offset);
            var zoom = parseInt(state.zoom)+delta;
            if(zoom<1){
                zoom = 1;
            }else if(zoom>20){
                zoom = 20;
            }
            map.style.transformOrigin= (event.clientX/state.width).toPercent()+" "+(event.clientY/state.height).toPercent(); //动态设置基点
            $(map).animateCss(delta>0?'zoomIn':'zoomOut');
            this.setState({center:[lonlat.lon,lonlat.lat],zoom:zoom});
        }
    },
    render: function() {
        var state = this.state;
        var width = state.width;
        var height = state.height;
        var server = state.server;
        var center = state.center;
        var zoom = state.zoom;

        tile = server.getMapTile(center[0],center[1],zoom);
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
        var x = width*0.5-offsetX;
        var y = height*0.5-offsetY;
        var checkState = function (){
            var len = directions.length;
            for (var index = 0; index < len; index++) {
                if(directions[index]){
                    return true;
                }
            }
            return false;
        }
        if(!tileCache){
            tileCache = {};
        }
        var turn = function (direaction,step) {
            coordinate = coordinate[direaction](step);
            if(urls = tileCache[coordinate]){
                cells.push(<Tile x={x} y={y} urls={urls} ></Tile>)
                return ;
            } 
            urls = provider.getTileUrls(coordinate);
            if(urls){
                tileCache[coordinate] = urls;
                cells.push(<Tile x={x} y={y} urls={urls} ></Tile>)
            } 
        }
        var cells = [<Tile x={x} y={y} urls={urls} ></Tile>];
        var directions=[true,true,true,true];//
        var forFlag = true;
        var index = 0;//方向
        var j=1;//步速
        var z=1;//某一个方向的总步数
        while(forFlag){
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
        return (
           <div className="map" ref="map" onWheel={this.handleMouseWheel} onMouseDown={this.handleDown} >
                {cells}
           </div>
       );
    }
});



