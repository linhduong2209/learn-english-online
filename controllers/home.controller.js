class HomeController {

    index(req, res){
        res.render('home.ejs');
    }

}

module.exports = new HomeController;