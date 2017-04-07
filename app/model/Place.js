var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

require('mongoose-type-url');

var PlaceSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    teamId: {
      type: String,
      required: true
    },
    url: mongoose.SchemaTypes.Url
});

PlaceSchema.plugin(random, { path: 'r' });

module.exports = mongoose.model('Place', PlaceSchema);
