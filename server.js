const express = require('express');
const app = express();
const collectionName = 'places';
const root = '/';
const routerRoot = root + collectionName;
const mongoOptions = {};

var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
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

    if (!places.length) {
      res.status(200).send({response_type: "in_channel", text: `@${req.body.user_name} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`});
    }

    let names = places.map(p => p.name).join(',');

    res.status(200).send({response_type: "in_channel", text: `@${req.body.user_name} these are the places in our database: ${names}`});
  });
});
