export class MapActions {
    /**
     * 缩放
     */
    zoomAction() {
        return {type:"zoom"};
    }
    /**
     * 漫游
     */
    panAction(offset) {
        var lonlat = this.getOffsetLonlat(offset);
        return {type:"pan"};
    }
    /**
     * 地图大小改变
     */
    resizeAction(){
        return {type:"resize"};
    }
}