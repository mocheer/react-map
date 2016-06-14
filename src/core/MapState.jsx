import React from 'react';

class GlobalState{
    constructor() {
        this.state = {};
        this.tileCache = {};
        this.tilePool = null;
        this.downPoint = null;
    }
    setState(newState){
        for (var key in newState) {
            if (newState.hasOwnProperty(key)) {
                var value = newState[key];
                if(this.state[key] !== value){
                    this.state[key] = value;
                }
            }
        }
    }
    getTiles(){
        var state = this.state;
        var server = new MapServer(state.provider);
        var zoom = state.zoom;
        var center = state.center;
        var tile = this.tile = server.getMapTile(center[0],center[1],zoom);
        var tileCache = this.tileCache;
        //
        var width = state.width;
        var height = state.height;
        //
        var coordinate = tile.coordinate;
        var offset = tile.offset;
        var scaleValue = tile.scaleValue;
        var urls;
        if(tileCache[coordinate]){
            urls =  tileCache[coordinate];
        }else{
            urls = tile.getUrls();
            tileCache[coordinate] = urls;
        }
        var createImg = function(x,y,urls){
            var style = {top:y,left:x};
            return <img className="tile" src={urls[0]} style={style} draggable="false" />
        }
        var createImgs = function(x,y,urls){
            var imgs = [];
            var len = urls.length;
            var style = {top:y,left:x};
            for (var index = 0; index < len; index++) {
                imgs.push(<img src={urls[index]} draggable="false" />)
            }
            return (
                <div className="tile" style={style}  >
                        {imgs}
                </div>
            );
        }
        var getTile = urls.length==1?createImg:createImgs;
        //
        var provider = tile.provider;
        var tileWidth = provider.tileWidth;
        var tileHeight = provider.tileHeight;
        //
        var x = width*0.5-offset[0];
        var y = height*0.5-offset[1];
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
            if(urls = tileCache[coordinate]){
                tiles.push(getTile(x,y,urls))
                return ;
            } 
            urls = provider.getTileUrls(coordinate);
            if(urls){
                tileCache[coordinate] = urls;
                tiles.push(getTile(x,y,urls))
            }
        }
        var tiles = [getTile(x,y,urls)];
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
        return tiles;
    }
    getOffsetLonlat(offset){
        return this.tile.getOffsetLonlat(offset);
    }
    mousedown(e){
        this.downPoint = [e.clientX,e.clientY];
    }
    mouseup(e){
        this.downPoint = null;
    }
    mousedrag(e){
        var downPoint = this.downPoint;
        if(downPoint){
            var offset = [e.clientX-downPoint[0], e.clientY-downPoint[1]];
            downPoint[0] = e.clientX;
            downPoint[1] = e.clientY;
            return {offset:offset};
        }
    }
    scrollWheel(e){
        var delta = 0;
        if (e.wheelDelta) {
            delta = e.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (e.detail) {
            delta = -e.detail/3;
        }else if(e.deltaY){
            delta = e.deltaY>0?-1:1;
        }
        if(delta!==0){
            var state = this.state;
            var zoom = parseInt(this.state.zoom) + delta;
            if(zoom<1){
                zoom = 1;
            }else if(zoom>20){
                zoom = 20;
            }
            var scale = delta>0?0.5:2;
            var offset = [(state.width*0.5 - e.clientX)*scale,(state.height*0.5 - e.clientY)*scale];//缩放基点的屏幕坐标
            return {zoom:zoom,offset:offset};
        }
        return null;
    }
    
}
export var MapState = new GlobalState();
