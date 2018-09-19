const {mongoose} = require('../config/mongodb.config');


var UsersGroupsSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    group : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Group'
    },
    created_date : {
        type : Date,
        default : new Date().getTime()
    },
    is_active : {
        type : Boolean
    }
});

var UserGroup = mongoose.model('UserGroup' , UsersGroupsSchema);

module.exports = {UserGroup};