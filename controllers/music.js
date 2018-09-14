const Music = require('../models/musicModel');
const User = require('../models/userModel');

module.exports = {
  findAll: (req, res) => {
    Music.find().populate('user')
    .then(musics => {
      res.status(200).json({
        message: 'success get all musics',
        musics: musics
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })
  },

  findByUser: (req, res) => {
    let id = req.user.id;

    console.log('<============================' + id);

    Music.find({user: id})
    .then(musics => {
      console.log(musics);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    })
  },

  upload: (req,res) => {
    console.log('masuk=====<');
    
    res.status(200).json({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    });
  },
  create : function(req,res){
    Music.create({
        title : req.body.title,
        file : req.body.file,
        user : req.user.id
    })
    .then(newMusic =>{
      User.findOne({
        _id : req.user.id
      })
        .then(user =>{
              res.status(200).json({
                musicId : newMusic._id,
                newMusic ,
                name : user.name,
                id : user._id
              })
        })
        .catch(err =>{
          res.status(400).json(err)
        })        
    })
    .catch(err =>{
        res.status(400).json(err)
    })
}
}