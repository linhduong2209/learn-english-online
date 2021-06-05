const bcrypt = require('bcrypt');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

let controller = {};

//class AuthController {
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username', // map username to custom field, we call it email in our form
    passwordField: 'password',
    passReqToCallback : true
  },
  async (req, username, password, done) => { 
    User.findOne({ username :  req.body.username }, 
      function(err, user) { 
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        } 
        if (user){ 
            console.log('User already exists');
            return done(null, false);
        }
        
        let newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10)
        });
        newUser.save();
        console.log('Saved');
        return done(null, newUser); 
      }
    );
    
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username', // map username to custom field, we call it email in our form
    passwordField: 'password',
    passReqToCallback: true
    },
    async (req, username, password, done) => { 
      User.findOne({ username: req.body.username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('Incorrect username.');
          return done(null, false, { message: 'Incorrect username.' });
        }
        let passwordValid = user && bcrypt.compareSync(password, user.password);
        if (password != req.body.password) {
          console.log('Incorrect password.');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
));

controller.loginPage = (req, res) =>{
    res.render('log_in.ejs');
}

controller.signupPage = (req, res) =>{
    res.render('sign_up.ejs');
}

controller.signup = passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/home'/*,
    failureFlash: {
      type: 'messageFailure',
      message: 'Email already taken.'
    },
    successFlash: {
      type: 'messageSuccess',
      message: 'Successfully signed up.'
    }*/
  });

//}

controller.login = passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login'/*,
    failureFlash: {
      type: 'messageFailure',
      message: 'Invalid email and/ or password.'
    },
    successFlash: {
      type: 'messageSuccess',
      message: 'Successfully logged in.'
    }*/
});


controller.logout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
  }

controller.create = (req, res) => {
  res.render('c_u.ejs');
}

controller.store = (req, res) => {
  //res.json(req.body);
  //const question = new Question(req.body);
  //question.save();

  const user = new User({
      username : req.body.id_q,
      email : req.body.description,
      password:req.body.answer1,
      admin : req.body.answer2
  });
  user.save();
  res.send('Saved');
}
module.exports = controller;
//module.exports = new AuthController;