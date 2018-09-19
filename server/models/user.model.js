const {mongoose} = require('../config/mongodb.config');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
        minlength : 1
    },
    email : {
        type : String,
        required : true,
        trim : true,
        minlength : 1 ,
        unique : true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
          }
    },
    password : {
        type : String,
        required : true
    },
    createdAt : {
        type : Number,
        default : new Date().getTime()
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
  
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

var User = mongoose.model('User' , UserSchema);

module.exports = {User};