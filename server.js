import connectToMongo from './app/bootstrap/MongoBootstrap';

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var menuRoute = require('./app/route/menuRoute');
var pickRandomRoute = require('./app/route/pickRandomRoute');
var showPlacesRoute = require('./app/route/showPlacesRoute');
var createPlaceRoute = require('./app/route/createPlaceRoute');

connectToMongo(app);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/places', [
  menuRoute,
  pickRandomRoute,
  showPlacesRoute,
  createPlaceRoute
]);

module.exports = app;
