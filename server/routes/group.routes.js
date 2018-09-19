module.exports = (app) => {

    var group = require('../controllers/group.controller');

    app.get('/groups' , group.findAll);

    app.post('/groups' , group.save);
}