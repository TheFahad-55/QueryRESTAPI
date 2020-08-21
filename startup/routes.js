const questionsRoutes = require('../routes/questions');

const express = require('express');

const error = require('../middleware/error');


const categoriesRoutes = require('../routes/categories');

const answersRoutes = require('../routes/answers');

const usersRoutes = require('../routes/users');

const authRoutes = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());

    app.use('/query/questions', questionsRoutes);

    app.use('/query/categories', categoriesRoutes);

    app.use('/query/users', usersRoutes);

    app.use('/query/auth', authRoutes);

    app.use('/query/answers', answersRoutes);

    app.use(error);
}