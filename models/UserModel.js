const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    
    subscription:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('user', UserSchema);

