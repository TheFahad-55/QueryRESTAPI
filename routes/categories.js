const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const Admin = require('../middleware/admin');

const auth = require('../middleware/auth');

const validateCategory = require('../models/Category').validateCategory;

const validateObjectId = require('../models/object').validateObjectId;

const Category = require('../models/Category').Category;

const asyncMiddleware = require('../middleware/async');

//get All CATEGORIES...
router.get('', [auth, Admin], asyncMiddleware(async(req, res) => {
    let courses = await Category.find();
    if (!courses) {
        return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(courses);
}));
//GET SINGLE CATEGORIE...

router.get('/:id', [auth, Admin], asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).send("No Such User Exists");
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
        return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(category);
}));
//Add A new CATEGORIE..
router.post('', [auth, Admin], asyncMiddleware(async(req, res) => {

    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let category = await Category.findOne({ name: req.body.name });
    if (category) {
        return res.status(400).send("Already Exists");
    }
    category = new Category({
        name: req.body.name
    });
    const result = await category.save();
    res.status(201).json({
        message: "Insertedd Successfully",
        category: result
    });
}));

//Update A CATEGORIE....
router.put('/:id', [auth, Admin], asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).send("No Such User Exists");
    }
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) {
        return res.status(404).json({ message: "Not Found" });
    }
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    category.name = req.body.name;
    if (category.addedBy) {
        category.addedBy = req.body.addedBy;
    }
    const result = await category.save();
    res.status(200).json({
        message: "Updated Successfully",
        category: result
    });



}));
//dELETE A CATEGORIE....
router.delete('/:id', [auth, Admin], asyncMiddleware(async(req, res) => {
    const valid = validateObjectId(req.params.id);
    if (!valid) {
        return res.status(400).send("No Such User Exists");
    }
    let category = await Category.findOne({ _id: req.params.id });
    if (!category) {
        return res.status(404).json({ message: "Not Found" });
    }
    const result = await Category.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
        message: "Delete Successfully",
        category: result
    });
}));






module.exports = router;