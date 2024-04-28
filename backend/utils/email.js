const nodemailer = require('nodemailer');

// Create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or another email service
  auth: {
    user: process.env.EMAIL_USER, // Email for sending notifications
    pass: process.env.EMAIL_PASS, // Email password
  },
});

// Function to send emails to active runners
const sendEmailToRunners = async (runners, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: runners.map(runner => runner.email).join(','), // Send to all active runners
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailToRunners };
