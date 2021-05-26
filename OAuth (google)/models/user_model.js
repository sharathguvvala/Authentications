const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    googleID:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User;