const Music = require('../models/musicModel');

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
    res.status(200).json({
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    });
  }
}