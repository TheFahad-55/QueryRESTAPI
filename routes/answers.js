const express = require('express');

const router = express.Router();

const asyncMiddleware = require('../middleware/async');

const Answer = require('../models/Answer').Answer;

const auth = require('../middleware/auth');

const validateAnswer = require('../models/Answer').validateAnswer;

const validateObjectId = require('../models/object').validateObjectId;

//Post A Answer.......
router.post('', auth, asyncMiddleware(async(req, res) => {
    const { error } = validateAnswer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const answer = new Answer({
        question: req.body.question,
        user: req.body.user,
        comment: req.body.comment
    });
    const result = await Answer.create(answer);
    rres.status(201).send({
        messsage: "Inserted Successfully",
        answer: result
    });;
}));

//Get All Answers....
router.get('', asyncMiddleware(async(req, res) => {
    const answers = await Answer.find();
    if (!answers) {
        return res.status(404).send("No Answers");
    }
    res.status(200).json(answers);
}));


//Get Single ANSWER....
router.get('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).json("Id Does.nt match The Pattern");
    }
    const answer = await Answer.findOne({ _id: req.params.id });
    if (!answer) {
        return status(404).send("Not Found");
    }
    res.status(200).send(answer);

}));

//Update A Answer....
router.put('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).json("Id Does.nt match The Pattern");
    }
    let answer = await Answer.findOne({ _id: req.params.id });
    if (!answer) {
        return res.status(404).json("No Answer Found");
    }
    const { error } = validateAnswer(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    answer.question = req.body.question;
    answer.user = req.body.user;
    anser.comment = req.body.comment;
    const result = await answer.save();
    res.status(200).send({
        messsage: "Updated Successfully",
        answer: result
    });
}));
//Delete The Answer.....
router.delete('/:id', auth, asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).json("Id Does.nt match The Pattern");
    }
    let answer = await Answer.findOne({ _id: req.params.id });
    if (!answer) {
        return res.status(404).json("No Answer Found");
    }
    const result = await Answer.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({
        messsage: "Deleted Successfully",
        answer: result
    });


}));
//Get Answers For Respected Questions....












module.exports = router;