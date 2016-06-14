'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {MapBox} from './core/MapBox.jsx';
import {Global} from './utilities/Global.js';
import {Utility} from './utilities/Utility.js';

// Utility.loadAnimateCss();//装载动画工具;
Utility.loadExtend();//装载基础类型拓展工具
export var ReactMap = {};
//render
ReactMap.render = function(element){
    // var element = document.getElementById(id);
    var attributes = element.attributes;//NamedNodeMap  
    var props = parseAttr(attributes);//
    //
    props.width = element.offsetWidth;
    props.height = element.offsetHeight;
    //
    var reactElement = React.createElement(MapBox, props)
    ReactDOM.render(reactElement, element);
}

function parseAttr(attributes){
    //provider
    var provider = attributes.provider.value;
    //center
    var center = attributes.center.value;
    center = center.split(",");
    center[0] = parseFloat(center[0]);
    center[1] = parseFloat(center[1]);
    //zoom
    var zoom = parseInt(attributes.zoom.value);
    return {
        provider:provider,
        center:center,
        zoom:zoom
    };
}

//set global
var global = new Global("react-map");
var options = {
  "ReactMap":ReactMap
}
global.setGlobals(options);






