const Question = require('../models/question.model');
const {mongooseToObject} = require('../util/mongoose');
class AdController {

     //[GET] /question
    index(req, res, next){
        Question.find({})
        .then(questions => res.render('question.ejs', {questions}))
        .catch(next);
    }

    //[GET] /question/create
    create(req, res){
        res.render('create_q.ejs');
    }

    //[POST] /question/store
    store(req, res){
        //res.json(req.body);
        //const question = new Question(req.body);
        //question.save();

        const question = new Question({
            id_q : req.body.id_q,
            description : req.body.description,
            answer:[req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4],
            correct : req.body.correct
        });
        question.save();
        res.send('Saved');
    }

    edit(req, res, next){
        Question.findById(req.params.id)
        .then(question => res.render('edit_q.ejs', {question : mongooseToObject(question),
        }),
        )
        .catch(next);
    }

    //PUT
    update(req, res, next){
        Question.updateOne({_id: req.params.id}, {
            id_q : req.body.id_q,
            description : req.body.description,
            answer:[req.body.answer1, req.body.answer2, req.body.answer3, req.body.answer4],
            correct : req.body.correct
        })
        .then(() => res.redirect('/question'))
        .catch(next);
    }

    //DELETE
    delete(req, res, next){
        Question.deleteOne({_id: req.params.id})
        .then(() => res.redirect('/question'))
        .catch(next);
    }

}

module.exports = new AdController;