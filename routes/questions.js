const express = require('express');

const router = express.Router();

const asyncMiddleware = require('../middleware/async');

const auth = require('../middleware/auth');

const Question = require('../models/Question').Question;

const Category = require('../models/Category').Category;
const validateQuestion = require('../models/Question').validateQuestion;

const validateObjectId = require('../models/object').validateObjectId;
//get All Questions...


router.get('', asyncMiddleware(async(req, res) => {
    let questions = await Question.find();
    if (!questions) {
        return res.status(404).send("Nothing found");
    }
    res.status(200).send(questions);
}));


//Get Questions for loggedIn User........
router.get('/user', auth, asyncMiddleware(async(req, res) => {
    const user = req.user._id;
    const questions = await Question.find({ user: user });
    if (!questions) {
        return res.status(404).send("User Has No Questions Added");
    }
    res.status(200).send(questions);
}));
//GET SINGLE Question
router.get('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(404).send("Not Found");
    }
    const question = await Question.findOne({ _id: req.params.id });
    if (!question) {
        return res.status(404).send("Not Found");
    }

    res.status(200).send(question);

}));



//Add A new Question..

router.post('', auth, asyncMiddleware(async(req, res) => {
    const { error } = validateQuestion(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    question = new Question({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        category: req.body.category
    });
    const result = await question.save();
    res.status(201).json({ messsage: "Inserted Successfully", question: result });
}));

//Update A Question....

router.put('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(404).send("Not Found");
    }
    let question = await Question.findOne({ _id: req.params.id });
    if (!question) {
        return res.status(404).send("Not Found");
    }
    const { error } = validateQuestion(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }


    question.title = req.body.title;
    question.description = req.body.description;
    const result = await question.save();
    res.status(200).json({ messsage: "Updated Successfully", question: result });

}));

router.delete('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(404).send("Not Found");
    }
    const question = await Question.findOne({ _id: req.params.id });
    if (!question) {
        return res.status(404).send("Not Found");
    }
    const result = await Question.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ messsage: "Deleted Successfully", question: result });
}));











module.exports = router;