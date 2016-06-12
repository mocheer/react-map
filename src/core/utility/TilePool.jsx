import React from 'react';
var tileCache = {};
export class TilePool{
    constructor(server,state) {
        this.server = server;
        this.state = state;
        this.tileCache = tileCache;
        //
        var zoom = state.zoom;
        var center = state.center;
        this.tile = server.getMapTile(center[0],center[1],zoom);
    }
    getTiles(){
        var state = this.state;
        var tileCache = this.tileCache;
        var tile = this.tile;
        //
        var width = state.width;
        var height = state.height;
        //
        var coordinate = tile.coordinate;
        var offsetX = tile.offsetX;
        var offsetY = tile.offsetY;
        var scaleValue = tile.scaleValue;
        var urls;
        if(tileCache[coordinate]){
            urls =  tileCache[coordinate];
        }else{
            urls = tile.urls;
            tileCache[coordinate] = urls;
        }
        var getTile = urls.length==1?this.getImg:this.getImgs;
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
    getImg(x,y,urls){
        var style = {top:y,left:x};
        // onDragStart={this.handleDrageStart} 
        return <img className="tile" src={urls[0]}  style={style} draggable="false" />
    }
    getImgs(x,y,urls){
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
    handleDrageStart(){
        return false;
    }
    //图片预加载
    preLoadImg(url) {
        var img = new Image();
        img.src = url;
    }

}