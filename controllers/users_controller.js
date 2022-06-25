const User=require('../models/user');
module.exports.signUp=function(req,res){

    return res.render('user_sign_up');

}
module.exports.profile = function(req , res){
    return res.render('user_profile');
}
module.exports.signIn=function(req,res){
    //just printing the cookies on screen 
    console.log(req.cookies);
    //setting up the cookies
    // res.cookie('user_id',25);
    // res.cookie('name','pheobe');
    return res.render('user_sign_in');

}

//for the profile page

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating a user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
        
    });
}

//sign in and create sessions
module.exports.createSession = function(req  , res){
    //steps for authentication
    //find the use
    User.findOne({email : req.body.email} , function(err , user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
        //handle user found
        if(user){
            //handle password which doesnot match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //handle session creation
            res.cookie('user_id' , user.id);
            return res.redirect('/users/profile');
        }else{
            //user not found
            return res.redirect('back');
        }
    });
}
