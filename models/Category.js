const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter The Category'],
        minlength: [5, 'Name Must Be Atleast 5']
    },
    addedBy: String

});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = {
        name: Joi.string().required().min(5),
        addedBy: Joi.string()
    };

    const result = Joi.validate(category, schema);
    return result;

}





module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
module.exports.categorySchema = categorySchema;