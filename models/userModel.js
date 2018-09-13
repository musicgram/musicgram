const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
       
    },
    password : {
        type : String,
        required: true
    },
    music : [{ type: Schema.Types.ObjectId, ref: 'Music' }]
},{
    timestamps: true
})

userSchema.pre('save',function(next){
   let pass =  bcrypt.hashSync(this.password,8)
   this.password = pass
   next()
})

const User = mongoose.model('User',userSchema)

module.exports = User