const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    register : function(req,res) {
        User.create({
            email : req.body.email,
            password : req.body.password,
            name : req.body.name
        })
        .then(function(){
            res.status(201).json({
                message : 'success'
            })
        })
        .catch(function(err){
            res.status(500).json({
                message : err.message
            })
        })
    },

    login : function(req,res) {
        User.findOne({
            email : req.body.email
        })
        .then(function(user){
            if (!user) {
                res.status(200).json({
                    message : 'wrong email or password'
                })
            } else {
                console.log(user.password)
                console.log(req.body.password)
                let check_pass = bcrypt.compareSync(req.body.password,user.password)
                if (check_pass) {
                    jwt.sign({
                        id : user._id
                    },process.env.JWT_SECRET,function(err,token){
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).json({
                                token : token
                            })
                        }
                    })
                } else {
                    res.status(200).json({
                        message : 'wrong email or password'
                    })
                }
            }
        })
        .catch(function(err){
            res.status(500).json({
                message : err.message
            })
        })
    }
}
