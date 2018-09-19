const {mongoose} = require('../config/mongodb.config');

var ConversationMessageSchema = mongoose.Schema({
    message : {
        type : String,
        required:  true,
        trim : true,
        minlength : 1
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'User'
    },

    time : {
        type : Number ,
        default : new Date().getTime()
    },

    status : {
        type : Number
    }
});

var ConversationMessage = mongoose.model('ConversationMessage' , ConversationMessageSchema);

module.exports = {ConversationMessage};