// import Redux from 'redux';
const Redux = require("redux");
import {MapReducer} from './reducers/MapReducer.js';

export const MapStore = Redux.createStore(MapReducer);