// Imports
const bCrypt = require('bcrypt-nodejs');
const models = require('../models/index');

// Find One
const findUser = async (req, user, username, password, done) => {

    // Finds User By ID
    models.User.findOne({ where : { userName: username}})
        .then( (user) => {

            let isValidPassword = (userpass, password) => {
                return bCrypt.compareSync(password, userpass);
            }

            // Username Check
            if (!user) { return done(null, false, { message: 'Username does not exist' }); } 

            // Password Check
            if (!isValidPassword(user.password, password)) { return done(null, false, { message: 'Incorrect password.' }); }
            
            // Sequilize Getter Function (Retreives User Info)
            let userinfo = user.get();
            
            return done(null,userinfo);
        })
        .catch( (err) => {
            console.log("Error:",err);
            return done(null, false, { message: 'Something went wrong with your Signin' });
        });

};

// Find One And Deserialize
const findUserAndDeserialize = async (query, done) => {

    models.User.findByPk(query, done)
    .then((user) => {
        if (user){ done(null, user.get()); }
        else { done(user.errors,null); }
    });

};

// Create One
const createUser = async (req, email, password, done) => {

    let result = models.User.findOne({ where: { email: email } })
        .then(function (user) {

        if (user) {
            return done(null, false, { message: 'That email is already taken' });
        } else {

            let data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: password,
                email: email,
            };

            models.User.create(data).then(function (newUser, created) {
                if (!newUser) { return done(null, false); }
                if (newUser) { return done(null, newUser); }
            });

        }

    });

    return result;

};

// Update One
const findAndUpdateUser = async (query) => {

    // Structure Data

    // Call DB

    // Return Result

};

// Delete One
const findAndDeleteUser = async (query) => {

    // Structure Data

    // Call DB

    // Return Result

};

module.exports = {
    findUser,
    findUserAndDeserialize,
    createUser,
    findAndUpdateUser,
    findAndDeleteUser
}