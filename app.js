const express = require('express');

const app = express();


const morgan = require('morgan');

const colors = require('colors');

require('./startup/routes')(app);


const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

require('./config/db')();


if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
}





const port = process.env.PORT || 5000;
require('./startup/unhandle')();

const server = app.listen(port, () => {
    console.log(`Listening on the ${port}`.green);
});