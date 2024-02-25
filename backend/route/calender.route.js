const {CalenderModel} = require("../model/calendermail.model")
const express=require("express")
const nodemailer = require('nodemailer');
// const app = express();
// app.use(express.json());
const calenderRouter=express.Router()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    secure:true, 
    auth: {
        user: 'utkarshagnihotri7@gmail.com', // Update with your email
        pass: 'gxlv tskz oyir nslc' // Update with your password
    }
});

const sendMailToUser = async (email, date) => {
    try {
        // Mail options
        let mailOptions = {
            from: 'utkarshagnihotri7@gmail.com', // Update with your email
            to: email,
            subject: 'Calendar Booking Confirmation',
            html: `<p>Your Calendar is booked for ${date}.</p>
                   <p>Please join on time.</p>`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Route to send email when booking a calendar
calenderRouter.post('/send-mail', async (req, res) => {
    try {
        const { email, date } = req.body;
        // Call function to send email
        await sendMailToUser(email, date);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {calenderRouter};