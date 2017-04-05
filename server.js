import connectToMongo from './app/bootstrap/MongoBootstrap';

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var menuController = require('./app/controller/menuController');
var pickRandomController = require('./app/controller/pickRandomController');
var showPlacesController = require('./app/controller/showPlacesController');
var createPlaceController = require('./app/controller/createPlaceController');

connectToMongo(app);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/places', [
  menuController,
  pickRandomController,
  showPlacesController,
  createPlaceController
]);

module.exports = app;
