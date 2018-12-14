// Module Imports
const bCrypt = require('bcrypt-nodejs');

const controllers = require('../controllers/usersController');

// Passport Strategy
const passportStrategy = (passport, user) => {

    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        controllers.findUserAndDeserialize(id,done);
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true
        }, (req, email, password, done) => {
            let generateHash = (password) => { return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); }
            controllers.createUser( req, email, generateHash(password), done);
        }
    ));

    passport.use('local-signin', new LocalStrategy({
            usernameField : 'userName',
            passwordField : 'password',
            passReqToCallback : true 
        }, async (req, username, password, done) => {
      
          let res = await controllers.findUser(req, user, username, password, done)
            
          return res;
        }
    ));

}

module.exports = passportStrategy;