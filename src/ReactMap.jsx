'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {MapBox} from './core/MapBox.jsx';
import {Global} from './utility/Global.js';
import {Utility} from './utility/Utility.js';

Utility.loadAnimateCss();//装载动画工具;
Utility.loadExtend();//装载基础类型拓展工具
export var ReactMap = {};

ReactMap.render = function(id){
    var element = document.getElementById(id);
    ReactDOM.render(
    <MapBox provider="GoogleProvider_AERIAL" center={[118.17939,25.30781]} zoom="4" width={map.offsetWidth} height={map.offsetHeight} />,
    element
  );
}
//set global
var global = new Global("react-map");
var options = {
  "ReactMap":ReactMap
}
global.setGlobals(options);






