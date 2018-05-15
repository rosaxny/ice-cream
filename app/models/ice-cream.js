let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FlavorSchema = new Schema({
	name: String,
	tried: Boolean,
	good: Boolean
});

module.exports = mongoose.model('flavor', FlavorSchema);