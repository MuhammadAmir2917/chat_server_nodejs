var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ChatApp' , {useNewUrlParser : true})
.then(()=> console.log('Now Conncted to mongodb'))
.catch((err) =>  console.error('Something went wrong ', err.stack));


module.exports = {mongoose};