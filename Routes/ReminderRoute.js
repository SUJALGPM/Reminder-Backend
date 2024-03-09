const express = require('express');
const { addNewReminder, getAllReminder, deleteReminder, updateRemainder } = require('../Controllers/ReminderController');
const router = express.Router();

//Add new Reminder...
router.post("/add-new-reminder", addNewReminder);

//Get all Reminder...
router.get("/get-all-reminder", getAllReminder);

//Update Reminder...
router.put("/update-reminder", updateRemainder);

//Delete Specific Reminder...
router.post("/delete-reminder", deleteReminder,);


module.exports = router;