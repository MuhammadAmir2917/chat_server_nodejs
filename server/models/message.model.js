const {mongoose} = require('../config/mongodb.config');

var MessageSchema = mongoose.Schema({
    subject  : {
        type : String,
        minlength : 1,
        trim : true,
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    create_date : {
        type : Date,
        default : new Date().getTime()
    }
     
});


var Message = mongoose.model('Message' , MessageSchema);

module.exports = {Message};