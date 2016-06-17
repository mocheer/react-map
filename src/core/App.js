import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MapBox from './MapBox'
import * as MapActions from './actions/MapActions'

const mapboxOptions ={
    crs:"EPSG3857",
    minZoom:0,
    maxZoom:20,
    //map interaction
    dragable:true,
    touchZoom:true,
    scrollWheelZoom:true,
    doubleClickZoom:true,
    //layer interaction
    clickable:true,
    markerdraggable:true,
    //animation
    zoomAnimation:true
}
//将state的属性绑定到props上
function mapStateToProps(state) {
  return {
    mapboxOptions:mapboxOptions,
    mapOptions:Object.assign({},state.mapOptions),
    controlOptions:Object.assign({},state.controlOptions)
  }
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MapActions, dispatch)
}

// function mergeProps(stateProps, dispatchProps, ownProps){
//    return Object.assign({}, ownProps, stateProps, dispatchProps);
// }

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(MapBox)