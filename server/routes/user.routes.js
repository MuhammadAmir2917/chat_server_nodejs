const auth = require('../middlerware/auth');

module.exports = function(app){
    var user = require('../controllers/user.controller');

    //Get All Users
    app.get('/users' ,auth , user.findAll);

    app.post('/users' , user.save);

    app.post('/users/login' , user.findByEmailAndPassword);

    app.get('/users/verify/token'  , user.verifyToken);
}