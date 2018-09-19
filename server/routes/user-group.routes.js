module.exports= function(app){

    var userGroup = require('../controllers/user-group.controller');

    app.get('/users/groups' , userGroup.findAll);

    app.post('/users/groups' , userGroup.save);
}