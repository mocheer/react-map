'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {MapBox} from './core/MapBox.jsx';

var map = document.getElementById('map');
ReactDOM.render(
  <MapBox provider="GoogleProvider_AERIAL" center={[118.17939,25.30781]} zoom="4" width={map.offsetWidth} height={map.offsetHeight} />,
  map
);



