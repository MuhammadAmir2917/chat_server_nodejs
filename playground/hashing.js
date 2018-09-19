var bcrypt = require('bcryptjs');

var password = '1235';

// bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, (err, hash) => {
//              console.log(hash);
//             });
//           });
var hashPassword = "$2a$10$.42/doYItnguuuYvogJNWucVbZptC2SlvzSrsBj5LZ0M4fCIWDaaC";

bcrypt.compare(password , hashPassword , (err , res) => {
    console.log(res);
});