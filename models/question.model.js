const mongoose = require('mongoose');
const Schema= mongoose.Schema

const Question = new Schema({
    id_q : String,
    description :String,
    answer:[String],
    correct : String
});

module.exports =  mongoose.model('Question', Question);