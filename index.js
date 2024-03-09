const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const dbConnect = require('./Config/db');
const ReminderRoute = require("./Routes/ReminderRoute");

//Configure the .env file...
dotenv.config();

//Configure the mongoose connection..
dbConnect();

//Rest object configure...
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//Configure the routes....
app.use("/api/remind", ReminderRoute);

//Setup the server port...
const port = process.env.PORT || 7300

//Running the server...
app.listen(port, () => {
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port no ${process.env.PORT}`.bgCyan.white)
});

