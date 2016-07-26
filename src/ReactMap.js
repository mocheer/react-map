'use strict';
import React from 'react';
import App from './core/App';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Global from './utilities/Global';
import Utility from './utilities/Utility';
import configureStore from './core/MapStore';
Utility.loadExtend();//装载基础类型拓展工具
// Utility.loadAnimateCss();//装载动画工具;

export var ReactMap = {};
//render
ReactMap.render = function(element){
    var attributes = element.attributes;//NamedNodeMap  
    var props = parseAttr(attributes,element.offsetWidth,element.offsetHeight);//
    const store = configureStore(props);
    render(
     <Provider store={store}>
        <App />
     </Provider>,
     element)
}

function parseAttr(attributes,w,h){
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
      mapOptions:{
          width:w,
          height:h,
          source:provider,
          center:center,
          zoom:zoom
        }
    };
}

//set global
var global = new Global("react-map");
var options = {
  "ReactMap":ReactMap
}
global.setGlobals(options);






