const { model } = require("mongoose");
const { reminderModel } = require("../Models/ReminderModel");


//Add new reminder...
const addNewReminder = async (req, res) => {
    try {
        const { reminderMsg, reminderAt } = req.body;

        //Check Reminder Message getting or not...
        if (!reminderMsg) {
            return res.status(404).send({ message: "Reminder message not found..!!" });
        }

        //Check the Reminder Time is getting or not..
        if (!reminderAt) {
            return res.status(404).send({ message: "Reminder Time not found..!!" });
        }

        //Format data before store...
        const formatData = {
            reminderMsg: reminderMsg,
            reminderAt: reminderAt,
            isReminded: false
        }

        //Insert the new reminder in reminder model....
        const newReminder = new reminderModel(formatData);
        await newReminder.save();

        //After Insert Fetch updated reminder data...
        const updatedData = await reminderModel.find({});


        //Whatsapp reminding functionality
        // setInterval(() => {
        //     reminderModel.find({}, (err, reminderList) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         if (reminderList) {
        //             reminderList.forEach(reminder => {
        //                 if (!reminder.isReminded) {
        //                     const now = new Date()
        //                     if ((new Date(reminder.reminderAt) - now) < 0) {
        //                         reminderModel.findByIdAndUpdate(reminder._id, { isReminded: true }, (err, remindObj) => {
        //                             if (err) {
        //                                 console.log(err)
        //                             }
        //                             const accountSid = process.env.ACCOUNT_SID
        //                             const authToken = process.env.AUTH_TOKEN
        //                             const client = require('twilio')(accountSid, authToken);
        //                             client.messages
        //                                 .create({
        //                                     body: reminder.reminderMsg,
        //                                     from: 'whatsapp:+14155238886',
        //                                     to: 'whatsapp:+917798802841'
        //                                 })
        //                                 .then(message => console.log(message.sid))
        //                                 .done()
        //                         })
        //                     }
        //                 }
        //             })
        //         }
        //     })
        // }, 1000);

        // Whatsapp reminding functionality
        setInterval(async () => {
            try {
                const reminderList = await reminderModel.find({ isReminded: false });
                if (reminderList) {
                    reminderList.forEach(async reminder => {
                        const now = new Date();
                        if ((new Date(reminder.reminderAt) - now) < 0) {
                            await reminderModel.findByIdAndUpdate(reminder._id, { isReminded: true });
                            const accountSid = process.env.ACCOUNT_SID;
                            const authToken = process.env.AUTH_TOKEN;
                            const client = require('twilio')(accountSid, authToken);
                            await client.messages.create({
                                body: reminder.reminderMsg,
                                from: 'whatsapp:+14155238886',
                                to: 'whatsapp:+917798802841'
                            });
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }, 1000);




        res.status(201).send({ message: "New Reminder Added Successfully...", data: updatedData });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to add new reminder..!!" });
    }
}


//Get all reminder...
const getAllReminder = async (req, res) => {
    try {
        const reminderData = await reminderModel.find({});
        res.status(201).send(reminderData);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to load the reminder list..." });
    }
}


//Update the remainder Date and Time....
const updateRemainder = async (req, res) => {
    try {
        const { remindId, reminderMsg, reminderAt } = req.body;

        //Formated the data before store....
        const newDataToUpdate = {
            reminderMsg: reminderMsg,
            reminderAt: reminderAt
        }

        //Find reminder and update it....
        const updateData = await reminderModel.findByIdAndUpdate(remindId, newDataToUpdate, { new: true });

        //Check the reminder exist or not....
        if (!updateData) {
            return res.status(501).send({ message: "Reminder not found..!!" })
        }

        res.status(201).send({ message: "Reminder successfully udpated.." });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to update the reminder..!!" });
    }
}


//Delete Specific Reminder...
const deleteReminder = async (req, res) => {
    try {

        const reminderId = req.body.id;
        const deleteData = await reminderModel.findByIdAndDelete(reminderId);

        if (deleteData) {
            //After Delete, Fetch updated reminder data...
            const updatedData = await reminderModel.find({});
            res.status(201).send({ message: "Delete Reminder Successfully...", data: updatedData });
        } else {
            // Handle the case where deletion was unsuccessful
            res.status(404).send({ message: "Reminder not found or failed to delete." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to delete reminder...!!!" });
    }
}


module.exports = { addNewReminder, getAllReminder, deleteReminder, updateRemainder }