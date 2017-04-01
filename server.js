const express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var random = require('mongoose-random');
var Place = require('./app/model/Place');

const app = express();
var router = express.Router();

// routers
var createPlace = require('./app/router/createPlace');
var showPlaces = require('./app/router/showPlaces');
var pickRandomPlace = require('./app/router/pickRandomPlace');
var menu = require('./app/router/menu');

// mongo configuration items
const mongoUri = process.env.MONGO_URI;
const mongoOptions = {};
const port = process.env.PORT || 3000;

mongoose.connect(mongoUri, mongoOptions).then(
  () => {
    app.listen(port, function() {
      Place.syncRandom(function (err, result) {
        console.log(`Place.syncRandom is finished, this is the sync result: ${result.updated}`);
      });
      console.log('listening on port ' + port);
    });
  },
  err => {
    console.log(err);
  }
);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use('/places', router);

router.post('/add', (req, res) => {
  return createPlace(req, res);
});

router.post('/show', (req, res) => {
  return showPlaces(req, res);
});

router.post('/random', (req, res) => {
  return pickRandomPlace(req, res);
});

router.post('/menu', (req, res) => {
  return menu(req, res);
});
