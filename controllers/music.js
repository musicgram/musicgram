const Music = require('../models/musicModel.js')

module.exports = {
    upload : function(req,res){        
            res.send({
              status: 200,
              message: 'Your file is successfully uploaded',
              link: req.file.cloudStoragePublicUrl
            })    
    },
    create : function(req,res){
        Music.create({
            title : req.body.title,
            file : req.body.file,
            user : req.user.id
        })
        .then(newMusic =>{
            res.status(200).json({
                musicId : newMusic._id
            })
        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }
}