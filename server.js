const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const collectionName = 'places';
const root = '/';
const routerRoot = root + collectionName;
const mongoOptions = {};

var bodyParser = require('body-parser');
var router = express.Router();
var mongoose   = require('mongoose');
var Place = require('./app/model/Place');

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongoUri, mongoOptions).then(
  () => {
    app.listen(port, function() {
      console.log('listening on port ' + port);
    });
  },
  err => {
    console.log(err);
  }
);

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(routerRoot, router);

router.get(root, (req, res) => {
  Place.find((err, places) => {
    if (err) {
      console.log(err);
      res.send(err);
    }

    res.json(places);
  });
});

router.post('/add', (req, res) => {
  var newPlace = new Place();

  newPlace.name = req.body.text;

  console.log('request: ' + JSON.stringify(req.body));
  console.log('headers: ' + JSON.stringify(req.headers));

  newPlace.save(err => {
    if (err) {
      console.log(err);
      res.send(err);
    }

    console.log(newPlace.name + ' saved to database');
    res.status(201).send(`@${req.body.user_name} your new place ${newPlace.name} has been added!`);
  });
});

router.post('/show', (req, res) => {
  Place.find((err, places) => {
    if (err) {
      console.log(err);
      res.send(err);
    }

    res.status(200).send(`@${req.body.user_name} these are the places in our database: ${JSON.stringify(places)}`);
  });
});
