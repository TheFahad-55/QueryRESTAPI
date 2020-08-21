const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const _ = require('lodash');

const auth = require('../middleware/auth');

const validateUser = require('../models/User').validateUser;
const asyncMiddleware = require('../middleware/async');

const User = require('../models/User').User;

//POST USER..(SIGNUP)
router.post('', asyncMiddleware(async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send({ message: "User Is Already Registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    const result = await user.save();
    res.status(200).send({
        message: "Successfully Registered",
        user: _.pick(result, ['_id', 'name', 'email'])
    });
}));

//$DESC  GET CURRENT LOGIN USER...

router.get('/me', auth, asyncMiddleware(async(req, res) => {
    const user = await User.findOne({ _id: req.user._id }).select('-password');
    res.status(200).send(user);
}));










module.exports = router;