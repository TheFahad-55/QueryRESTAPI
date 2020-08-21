const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name Is Required'],
        minlength: [5, 'Name Must Be AtLeast 5 Characters'],
        maxlength: [55, 'Can Be Upto 55 Characters'],
    },
    email: {
        type: String,
        required: [true, 'Email Is Required'],
        unique: true,
        pattern: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Enter Valid Email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
        minlength: [5, 'Password must be at least 5 characters'],
        maxlength: [255, 'Password must be at most 55 characters']
    },
    isAdmin: Boolean

});

userSchema.methods.generateToken = function() {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, process.env.privateKey);
    return token;

}

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(55).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(255)
    };

    const result = Joi.validate(user, schema);
    return result;
}


const User = mongoose.model('User', userSchema);



module.exports.User = User;
module.exports.validateUser = validateUser;