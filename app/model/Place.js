var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }
});

module.exports = mongoose.model('Place', PlaceSchema);
