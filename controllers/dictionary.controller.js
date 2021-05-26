const Word = require('../models/word.model');
const {mongooseToObject} = require('../util/mongoose')
class DictionaryController {

    search(req, res, next){
        //res.send(req.params.slug);
        //Word.find({}, function(err, words){
        //    if(!err) res.json(words);
        //});
        Word.findOne({w : req.params.slug})
        .then(word =>{
            res.render('dictionary_result.ejs', {word : mongooseToObject(word)});
        })
        .catch(next);
    }

    index(req, res){
        res.render('dictionary_search.ejs');
    }

}

module.exports = new DictionaryController;