const mongoose = require('mongoose')
const Schema = mongoose.Schema

const musicSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    file : {
        type : String,
        required : true
    },
    user : {type : Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps : true
})

const Music = mongoose.model('Music',musicSchema)

module.exports = Music