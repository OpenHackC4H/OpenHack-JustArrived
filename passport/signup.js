var bCrypt = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

    //Define passport signup strategy
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        findOrCreateUser = function() {

            User.findOne({ 'username': username }, function(err, user) {
                if (err) {
                    console.log('Error during signup: ' + err);
                    return done(err);
                }

                if (user) {
                    console.log('User ' + username + ' already exists.');
                    return done(null, false);
                }
                else {

                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.body.email;

                    newUser.save(function(err) {
                        if (err) {
                            console.log('Could not save user!');
                            console.log(err);
                            return done(err);
                        }

                        console.log("Successfully added new user: " + username);
                        return done(null, newUser);
                    });
                }
            });
        };

        console.log("Adding user...");
        process.nextTick(findOrCreateUser);
    }));

    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
