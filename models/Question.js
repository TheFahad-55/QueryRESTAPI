const mongoose = require('mongoose');
const User = require('./User');
const Joi = require('@hapi/joi')
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title Is Required'],
        minlength: [5, 'title must be at least 5 characters'],
        maxlength: [55, 'title must be at most 55 characters']
    },
    description: {
        type: String,
        required: [true, 'Description Is Required'],
        minlength: [5, 'description must be at least 5 characters'],
        maxlength: [255, 'description must be at most 255 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'

    }
});

const Question = mongoose.model('Question', questionSchema);

function validateQuestion(question) {
    const schema = {
        title: Joi.string().required().min(5).max(55),
        description: Joi.string().required().min(5).max(255),
        category: Joi.string().required().min(3)
    };
    const result = Joi.validate(question, schema);
    return result;
}



module.exports.Question = Question;
module.exports.validateQuestion = validateQuestion;