const {mongoose} = require('../config/mongodb.config');

var MessageRecipientSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    group : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    },

    message : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    },
    is_read : {
        type : Boolean,
        default : false
    }
});

var MessageRecipient = mongoose.model('MessageRecipient' , MessageRecipientSchema);

module.exports ={MessageRecipient};