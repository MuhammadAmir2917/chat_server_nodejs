const {Group} = require('../models/group.model');
const {UserGroup} = require('../models/user-group.model');

findAll = (req , res) => {
    Group.find()
    .then(groups => { res.send(groups); })
    .catch(err => res.status(500).send({message : err.message}));
}

save = (req , res) => {
    var group = new Group(req.body);
    group.save().then(doc => res.send(doc._id))
    .catch(err => res.status(500).send({message : err.message}));
}

module.exports= {
    findAll,
    save
}

