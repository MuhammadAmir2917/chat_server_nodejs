const {mongoose} = require('../config/mongodb.config');

var GroupSchema = mongoose.Schema({
    title : {
        type : String ,
        required : true,
        trim : true,
        minLength : 1
    },
    create_date : {
        type : Date,
        default : new Date().getTime()
    },
    is_active : {
        type : Boolean
    }
});

var Group = mongoose.model('Group' , GroupSchema);

module.exports = {Group};