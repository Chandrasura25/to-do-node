const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    ToDos:String
})
let userModel = mongoose.model('user_tb',userSchema)
module.exports=userModel