const {mongoose} = require('../config/mongodb.config');


var ConversationSchema = mongoose.Schema({
    user_one : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    user_two : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    time : {
        type : Number,
        default : new Date().getTime()
    },

    status : {
        type : Number
    }
});

var Conversation = mongoose.model('Conversation' , ConversationSchema);

module.exports = {Conversation};
