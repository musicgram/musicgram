const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authenticate = (req, res, next) => { 
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
              next()
            }
          })
          .catch(err =>{
            res.status(400).json({ "error": "You are not authorized to access this API" })  
          })                        
        } else {            
          res.status(400).json({ "error": "You are not authorized to access this API" })
        }
      })
  } else {
    res.status(400).json({ "error": "You are not authorized to access this API" })
  }
}

module.exports = authenticate;



