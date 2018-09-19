const {UserGroup} = require('../models/user-group.model');

findAll = (req , res) => {
    UserGroup.find().populate(['user' , 'group']).then(groups => res.send(groups))
    .catch(err => res.status(500).send({message : err.message}));
}

findUserGroup = (req , res) => {
    
}

save = (req , res) => {
    var newGroup = new UserGroup(req.body);
    newGroup.save().then(doc => res.send(doc))
    .catch(err => res.status(500).send({message : err.message}));
}

module.exports ={
    findAll,
    findUserGroup,
    save
}