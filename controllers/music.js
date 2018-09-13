module.exports = {
    upload : function(req,res){
        
            res.send({
              status: 200,
              message: 'Your file is successfully uploaded',
              link: req.file.cloudStoragePublicUrl
            })    
    }
}