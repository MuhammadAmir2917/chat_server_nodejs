module.exports = function(app){

    var messages = require('../controllers/group-message.controller');

    app.get('/users/groups/messages/:groupId' , messages.findByGroupId);
}