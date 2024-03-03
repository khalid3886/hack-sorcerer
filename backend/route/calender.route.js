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
            html: ` <div style="background-color: #f0f0f0; padding: 20px; border-radius: 10px; text-align: center;">
            <h2 style="margin-bottom: 10px;">Your Calendar Booking</h2>
            <p><strong>Hello, Greeting of the day !</strong></p>
            <p>We are excited to confirm your booking for the upcoming event:</p>
            <p><strong>Event:</strong> Virtual Team Meeting</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> 10:00 AM - 11:00 AM</p>
            <p>Please make sure to mark your calendar for this important event. Your participation is greatly appreciated.</p>
            <p>Click the button below to join the meeting on time:</p>
            <a href="https://gatherhub.netlify.app/public/room.html?room=3ea89498d" style="display: inline-block; background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;">Join Now</a>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Best regards,<br>Your Team</p>
        </div>`
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