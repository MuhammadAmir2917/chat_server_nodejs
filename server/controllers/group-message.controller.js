const {MessageRecipient} = require('../models/message-recipient.model');

findByGroupId = (req , res) => {
    var groupId = req.params.groupId;

    MessageRecipient.findById(groupId)
    .populate(['message' , 'group' , 'user'])
    .then(messages => {
        res.send(messages);
    }).catch(err => res.status(500).send({message : err.message}));
}

module.exports= {
    findByGroupId
}
