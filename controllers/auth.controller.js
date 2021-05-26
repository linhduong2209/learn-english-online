let bcrypt = require('bcryptjs');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user.model');

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
    //usernameField: 'username', // map username to custom field, we call it email in our form
    //passwordField: 'password',
    passReqToCallback : true
  },
  async (req, username, password, done) => { 
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        } 
        if (user){ 
            console.log('User already exists');
            return done(null, false);
        }
        else {
        let newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(password, 10)
        });
        newUser.save();
        console.log('Save');
        return done(null, newUser);
        }
      }
    );
}));

passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
    },
    async (req, username, password, done) => { 
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
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
    failureRedirect: '/home'
    /*failureFlash: {
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
    failureRedirect: '/login'
    /*failureFlash: {
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

module.exports = controller;
//module.exports = new AuthController;