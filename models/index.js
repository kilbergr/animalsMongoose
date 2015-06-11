var mongoose =  require("mongoose");

mongoose.connect('mongodb://localhost/animals_data');
mongoose.set('debug', true);

var Animal = require('./animal');
module.exports.Animal = Animal;