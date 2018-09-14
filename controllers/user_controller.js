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
    },

    getUsers : function(req,res) {
        User.find({})
        .then(function(users){
            res.status(200).json({
                users : users
            })
        })
        .catch(function(err){
            message: err.message
        })
    },

    verifyUser : function(req,res) {
        if (req.headers['authorization']) {
            let tokens = req.headers['authorization'].split(' ')
            if (tokens[0] == 'Bearer') {
              jwt.verify(tokens[1], process.env.JWT_SECRET, (err, decoded) => {
                if (!err && decoded) {
                  req.user = decoded
                  User.findById(req.user.id)
                  .then(user=>{
                    if(user == null){
                      res.status(400).json({ "error": "You are not authorized to access this API" })
                    }
                    else{
                      res.status(200).json({
                          message : 'success'
                      })
                    }
                  })
                  .catch(err =>{
                    res.status(400).json({ "error": "You are not authorized to access this API" })
                  })
                } else {
                  res.status(400).json({ "error": "You are not authorized to access this API" })
                }
              })
            }
          } else {
            res.status(400).json({ "error": "You are not authorized to access this API" })
          }
    },

    addMusic : function(req,res){
        User.findOneAndUpdate({
            _id : req.user.id
        },{
            $push : {music : req.body.musicId }
        })
        .then(updatedUser =>{
            res.status(200).json({
                msg : 'success add new music'
            })
        })
        .catch(err =>{
            res.status(400).json(err);
        });
    }
}
