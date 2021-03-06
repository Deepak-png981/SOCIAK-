const mongoose=require('mongoose');
//schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
        required:true
    
    },
    name:{
        type:String,
        required:true
    }

},{
    //to add a feature of 'created at' and 'updated at'.
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;