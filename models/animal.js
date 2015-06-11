var mongoose =  require("mongoose");
 
var animalSchema = new mongoose.Schema({
	type: String,
	relative: String,
	friend: String,
	pic: String
});

var Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;