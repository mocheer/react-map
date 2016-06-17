import React,{Component,PropTypes} from 'react'
import TileLayer from './layers/TileLayer';
/**
 * 
 */
export default class MapBox extends Component {
    constructor(props) {
        super(props);
        const {mapOptions} = props;
        const {source,center,zoom} = mapOptions;
        this.server = new MapServer(source);
        this.tile = this.server.getMapTile(center[0],center[1],zoom);
    }
    componentDidMount(){
        // window.addEventListener('resize', (e)=>{resize(e)});
    }
    shouldComponentUpdate(newProps, newState) {
        const {mapOptions} = this.props;
        return mapOptions!==newProps.mapOptions;
    }
    componentWillUpdate(nextProps, nextState) {
       const {mapOptions} = nextProps;
       const {center,zoom} = mapOptions;
       this.tile = this.server.getMapTile(center[0],center[1],zoom);
    }
    /**
     * 鼠标按下
     */
    handleMouseDown(e){
        const {mapboxOptions,panTo} = this.props;
        const {dragable} = mapboxOptions;
        if(dragable){
            const {clientX,clientY} = e;
            var downPoint = [clientX,clientY];
            var map = this.refs.map;
            map.onmousemove = e=>{
                const {clientX,clientY} = e;
                var offset = [clientX-downPoint[0], clientY - downPoint[1]];
                const {offsetLeft,offsetTop} = map;
                // map.style.left = offsetLeft + offset[0] +"px";
                // map.style.top = offsetTop + offset[1] +"px";
                downPoint = [clientX,clientY];
                var lonlat = this.tile.getOffsetLonlat(offset);
                panTo(lonlat);
            }
            map.onmouseup = e=>{
                downPoint = null;
                map.onmousemove = null;
                map.onmouseup = null;
            }
        }
    }
    handleMouseWheel(e){
        var delta = 0;
        if (e.wheelDelta) {
            delta = e.wheelDelta/120; 
            if (window.opera) delta = parseInt(-delta);
        } else if (e.detail) {
            delta = -parseInt(e.detail/3);
        }else if(e.deltaY){
            delta = e.deltaY>0?-1:1;
        }
        if(delta!==0){
            const {mapboxOptions,mapOptions,zoomTo} = this.props;
            var {minZoom,maxZoom} = mapboxOptions;
            var {width,height,zoom} = mapOptions;
            zoom += delta;
            if(zoom < minZoom){
                zoom = minZoom;
            }else if(zoom > maxZoom){
                zoom = maxZoom;
            }
            var scale = delta>0?0.5:2;
            var offset = [(width*0.5 - e.clientX)*scale,(height*0.5 - e.clientY)*scale];//缩放基点的屏幕坐标
            //
            var lonlat = this.tile.getOffsetLonlat(offset);//缩放基点的经纬度
            lonlat = [lonlat.lon,lonlat.lat];
            zoomTo(zoom,lonlat);
        }
    }
    //onMouseUp={(e)=>{mouseup(e)}}
    render() {
        const {mapboxOptions,mapOptions,controlOptions} = this.props;
        // var style = {left:0,top:0} style={style}
        return (
            <div className="mapbox">
               <div className="map" ref="map"  onWheel={this.handleMouseWheel.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}  >
                    <TileLayer {...mapOptions} tile={this.tile} ></TileLayer>
               </div>
           </div>
       );
    }
}