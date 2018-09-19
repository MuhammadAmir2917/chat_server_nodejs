const jwt = require('jsonwebtoken');

var token = jwt.sign({_id: "1234"}, 'amir2917').toString();

console.log(token);