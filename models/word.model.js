const mongoose = require('mongoose');
const Schema= mongoose.Schema

const Word = new Schema({
	w : String,
    part_of_speech : [String],
    pronunciation : String,
    definition : [String]
});

module.exports =  mongoose.model('Word', Word);