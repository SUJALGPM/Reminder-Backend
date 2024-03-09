const mongoose = require('mongoose');

//Configure the schema...
const reminderSchema = mongoose.Schema({
    reminderMsg: {
        type: String,
        required: false
    },
    reminderAt: {
        type: String,
        required: false
    },
    isReminded: {
        type: Boolean,
        required: false
    }
});

//Configure the reminder model....
const reminderModel = mongoose.model('Reminder', reminderSchema);

module.exports = { reminderModel };