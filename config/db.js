const mongoose = require('mongoose');

async function connectDb() {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected with the host ${connect.connection.host}`.green);


}

module.exports = connectDb;