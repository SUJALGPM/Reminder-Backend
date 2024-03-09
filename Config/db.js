const mongoose = require('mongoose');
const colors = require('colors');


//Connect to Mongodb database...
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Reminder Successfully Connected to Mongodb Atlas Database...`.bgGreen.white);
    } catch (err) {
        console.log(`Mongo server ${err}`.bgRed.white);
        console.log(`TeaTover Failed to connect to Database...`.bgRed.white);
    }
}

module.exports = dbConnect;