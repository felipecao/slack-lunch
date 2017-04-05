var mongoose = require('mongoose');
var random = require('mongoose-random');
var Place = require('../model/Place');

const mongoUri = process.env.MONGO_URI;
const mongoOptions = {};
const port = process.env.PORT || 3000;

function connectToMongo(app) {
  return mongoose.connect(mongoUri, mongoOptions).then(
    () => {
      app.listen(port, function() {
        Place.syncRandom(function (err, result) {
          console.log(`Place.syncRandom is finished, this is the sync result: ${JSON.stringify(result)}`);
        });
        console.log('listening on port ' + port);
      });
    },
    err => {
      console.log(err);
    }
  );
}

module.exports = connectToMongo;
