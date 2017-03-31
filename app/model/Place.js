var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }
});

PlaceSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Place', PlaceSchema);
