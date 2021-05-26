class ExamsController {

    index(req, res){
        res.render('exams.ejs');
    }

}

module.exports = new ExamsController;