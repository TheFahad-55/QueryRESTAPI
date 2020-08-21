const mongoose = require('mongoose');

const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: [true, 'Answer Is Required'],
        minlength: [10, 'Answer Must be at least 10 characters long']
    }

});

function validateAnswer(answer) {
    const schema = {
        question: Joi.objectId().required(),
        user: Joi.objectId().required(),
        comment: Joi.string().min(10).max(200)
    };
    const result = Joi.validate(answer, schema);
    return result;
}


const Answer = mongoose.model('Answer', answerSchema);




module.exports.Answer = Answer;
module.exports.validateAnswer = validateAnswer;