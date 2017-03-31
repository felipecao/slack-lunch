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

function sendResponse(res, text, status = 200) {
  return res.status(status).send({
    response_type: "in_channel",
    text: text
  });
}

function sendError(res, err, userName = "", placeName = "") {
  console.log(err);

  if (err.code === 11000) {
    console.log('constraint violation');
    return res.status(409).send(`@${userName} '${placeName}' already exists`);
  }

  return res.status(400).send(err);
}

router.post('/add', (req, res) => {
  var newPlace = new Place();

  newPlace.name = req.body.text;

  console.log('request: ' + JSON.stringify(req.body));
  console.log('headers: ' + JSON.stringify(req.headers));

  newPlace.save(err => {
    if (err) {
      return sendError(res, err, req.body.user_name, newPlace.name);
    }

    console.log(`'${newPlace.name}' saved to database`);

    return sendResponse(
      res,
      `@${req.body.user_name} your new place *${newPlace.name}* has been added!`,
      201
    );
  });
});

router.post('/show', (req, res) => {
  Place.find((err, places) => {
    if (err) {
      return sendError(res, err);
    }

    if (!places.length) {
      return sendResponse(
        res,
        `@${req.body.user_name} there are no places yet! Why don't you try to create the first one by using the \`/add\` command?`
      );
    }

    const names = places.map(p => `*${p.name}*`).join('\n');

    return sendResponse(res, `@${req.body.user_name} these are the places in our database: \n${names}`);
  });
});
