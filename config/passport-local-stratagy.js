const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//format of using it
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email'
},
    function(email , password , done){
        //find the user and establish it immediately
        User.findOne({email : email } , function(err , user){
            if(err){
                console.log('Error in finding the user  --> PASSPORT');
                //this will report the error to the passport
                return done(err);
            }
            //checking if the user is not found or the password entered is not matching to the password in db 
            if(!user || user.password != password){
                console.log('INVALID USERNAME/PASSWORD');
                return done(null , false);  //since the authentication is not done so we are passing false

            }
            //finally if the user is found
            return done(null , user);
        });
    }
));


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
});


//deserializing the user from the key in the cookies
passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        if(err){
            console.log('Error in finding the user --> PASSPORT');
            return done(err);
        }
        return done(null , user);

    });
});

// check if the user is authenticated
passport.checkAuthentication  = function(req , res , next){
    //if the user is sign in then pass on the request
    //to the next function which is my controllers function
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not sign in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie
        //we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

//exporting it
module.exports = passport;