'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {MapBox} from './core/MapBox.jsx';
import {Global} from './utility/Global.js';
import {Utility} from './utility/Utility.js';

// Utility.loadAnimateCss();//装载动画工具;
Utility.loadExtend();//装载基础类型拓展工具
export var ReactMap = {};

ReactMap.render = function(map){
    console.log(map)
    // var element = document.getElementById(id);
    var props = {};
    var attributes = map.attributes;//NamedNodeMap  
    var len = attributes.length;
    for (var i = 0, item; i < len; i++) {
        item = attributes[i];
        props[item.name] = item.value;
    }
    //center
    var center = props.center.split(",");
    center[0] = parseFloat(center[0]);
    center[1] = parseFloat(center[1]);
    props.center = center;
    //
    props.zoom = parseInt(props.zoom);
    //
    props.width = map.offsetWidth;
    props.height = map.offsetHeight;
    //
    var reactElement = React.createElement(MapBox, props)
    ReactDOM.render(reactElement, map);
}

//set global
var global = new Global("react-map");
var options = {
  "ReactMap":ReactMap
}
global.setGlobals(options);






