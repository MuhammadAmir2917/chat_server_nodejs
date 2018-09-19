const {User} = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {privateKey} = require('../config/config');
const jwt= require('jsonwebtoken');


findAll = (req , res) => {
     User.find()
    .then(users => {
       res.send(users);
    }).catch(err => {
        res.status(500).send({message : err.message});
    })
}

findByEmailAndPassword = (req , res) => {
    User.find({email : req.body.email}).then(user => {
        
         if(!user){
             return res.send({result : false});
        }

        bcrypt.compare(req.body.password, user[0].password, (errr, result) => {
            if(!result){
                return res.send({result : false});
            }
            var token = jwt.sign({_id: user[0]._id}, privateKey).toString();
            res.header('x-auth-token', token).send({result : true,
                token,
                user : _.pick(user[0] , ['firstname' , 'lastname' , 'email' , 'createdAt'])
            });
          });

        // 
        // 
       // res.send();
        
        
    }).catch(err => {
        res.status(500).send({message : err.message});
    });
}

save = (req , res) =>{
    var user= new User(req.body);
    user.save().then(doc => {
        res.send({message : 'User Created!' , user : _.pick(doc , ['firstname' , 'lastname' , 'email' , 'createdAt'])});
    }).catch(err => {
        res.status(500).send({message : err.message});
    }); 

}

verifyToken = (req , res) => {
    var token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send({result : false , message : 'Access denied. No JWT provided.'});
    }

    try{
        const decoded = jwt.verify(token, privateKey);
        res.send({result : true})
    }catch(ex){
        res.status(400).send({result : false , message : 'Invalid JWT.'});
    }
}

// findAll = () => {
//     return User.find()
//     .then(users => {
//         return users;
//     }).catch(err => {
//         return Promise.reject(err);
//     })
// }

// save = (user) =>{
//     var user= new User(user);
//     return user.save().then(doc => {
//         return doc;
//     }).catch(err => {
//         return Promise.reject(err);
//     }); 

// }

module.exports = {
    findAll,
    save,
    findByEmailAndPassword,
    verifyToken
}