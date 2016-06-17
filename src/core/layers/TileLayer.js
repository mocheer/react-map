import React,{Component,PropTypes} from 'react'

export default class TileLayer extends Component {
      constructor(props) {
            super(props);
            this.tileCache = {};
            this.extent = [];
            // this.state = {tiles:this.getTiles(props)}
            this.tiles = this.getTiles(props);
      }
      componentWillReceiveProps(newProps) {
        // this.setState({tiles:this.getTiles(newProps)})
      }
      shouldComponentUpdate(newProps, newState) {
        var {tile,width,height} = this.props;
        return newProps.tile!==tile || newProps.width!==width || newProps.height!==height;
      } 
      componentWillUpdate(nextProps, nextState) {
        // this.tiles = this.getTiles(nextProps);
        this.tiles = this.getTiles(nextProps);
      }
      getTiles(props){//get tiles after update zoom,provider
        var tileCache = this.tileCache;
        var {width,height,tile} = props;
        var {provider,coordinate,offset,scaleValue} = tile;
        var urls;
        if(tileCache[coordinate]){
            urls =  tileCache[coordinate];
        }else{
            urls = tile.getUrls();
            tileCache[coordinate] = urls;
        }
        //
        var tileWidth = provider.tileWidth;
        var tileHeight = provider.tileHeight;
        //
        var x = width*0.5-offset[0]
        var y = height*0.5-offset[1]
        var style = {left:x,top:y};

        var createImg = function(urls,style){
            return <img className="tile" key={urls[0]} src={urls[0]} style={style} draggable="false" />
        }
        var checkState = function (){
            for (var index = 0; index < 4; index++) {
                if(directions[index]){
                    return true;
                }
            }
            return false;
        }

        var addTile = function(coordinate){
            if(x > width || y>height || x<-tileWidth || y<-tileHeight){
                return false;
            }
            if(urls = tileCache[coordinate]){
                style = {left:x,top:y};
                tiles.push(createImg(urls,style))
            }else if(urls = provider.getTileUrls(coordinate)){
                tileCache[coordinate] = urls;
                style = {left:x,top:y};
                tiles.push(createImg(urls,style))
            }
            return true;
        }
        var tiles = [createImg(urls,style)];
        var directions=[true,true,true,true];//
        var forFlag = true;//条件
        var index = 0;//方向
        var j=1;//剩余路程
        var z=1;//某一个方向的总步数
        while(forFlag){
            j--;//走一步
            switch(index){//right,down,left,up
                case 0:
                    x += tileWidth;
                    coordinate = coordinate.right();
                    if(x > width){
                        directions[0] = false;
                        forFlag = checkState();
                    }else{
                        addTile(coordinate);
                    }
                    break;
                case 1:
                    y += tileHeight;
                    coordinate = coordinate.down();
                    if(y>height){
                        directions[1] = false;
                        forFlag = checkState();
                        if(j>0){
                            y += tileHeight*(j);
                            coordinate = coordinate.down(j);
                            j=0;
                        }
                    }else{
                        addTile(coordinate);
                    }
                    if(j===0){
                        z++;
                    }
                    break;
                case 2:
                    x -= tileWidth;
                    coordinate = coordinate.left();
                    if(x<-tileWidth){
                        directions[2] = false;
                        forFlag = checkState();
                    }else{
                        addTile(coordinate)
                    }
                    break;
                case 3:
                    y -= tileHeight;
                    coordinate = coordinate.up();
                    if(y<-tileHeight){
                       directions[3] = false;
                       forFlag = checkState();
                    }else{
                        addTile(coordinate);
                    }
                    if(j===0){
                        index = -1;//一个循环
                        z++;
                    }
                    break;
            }
            if(j===0){
                index++;
                j=z;
            }
        }
        return tiles;
    }
    render() {
        return (
            <div className="tilelayer" >
                {this.tiles}
            </div>
        );
    }
}