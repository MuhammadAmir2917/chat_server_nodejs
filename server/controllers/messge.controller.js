const {Message} = require('../models/message.model');
const {MessageRecipient} = require('../models/message-recipient.model');

save = (req , res) => {
    var messageObject = {
        subject : req.body.subject,
        sender : req.body.user
    };

    var newMessage = new Message(messageObject);
    newMessage.save().then(doc =>{
        var messageId = doc._id;
        var messageRecipientObject = {
            user : req.body.user,
            group : req.body.group,
            message : messageId
        };

        var newMessageRecipient = new MessageRecipient(messageRecipientObject);
        newMessageRecipient.save().then(doc => res.send(doc))
        .catch(err => res.status(500).send({message : err.message}));

    }).catch(err =>  res.status(500).send({message : err.message}));
}

module.exports = {
    save
}