const express = require('express');

const asyncMiddleware = require('../middleware/async');

const User = require('../models/User').User;

const Joi = require('@hapi/joi');

const bcrypt = require('bcrypt');


const router = express.Router();

router.post('', asyncMiddleware(async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send("Invalid Email or Password");
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
        return res.status(400).json("Invalid Email or Password");
    }
    console.log("Valid User".green.bold);
    const token = user.generateToken();

    res.header('x-auth-token', token).send(token);




}));

function validateUser(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(255)
    };

    const result = Joi.validate(user, schema);
    return result;
}








module.exports = router;