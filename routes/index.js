const homeRouter = require('./home.route');
const dictionaryRouter = require('./dictionary.route');
const examsRouter = require('./exams.route');
const adRouter = require('./ad.route');
const authRouter = require('./auth.route');
function route(app){
    app.use('/question', adRouter);
    app.use('/exams', examsRouter);
    app.use('/dictionary', dictionaryRouter);
    app.use('/home', homeRouter);
    app.use('/', authRouter);
}

module.exports = route;