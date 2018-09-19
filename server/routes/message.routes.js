module.exports = function(app){

    var message = require('../controllers/messge.controller');

    app.post('/users/groups/message' , message.save);
}