// emailMiddleware.js
const nodemailer = require('nodemailer');
const generateEmailTemplate = require('../templete/emailTemplate');

const sendRegistrationEmail = (user, activationLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.gmailID,
      pass: process.env.gmailPW,
    },
  });

  const mailOptions = {
    from: process.env.gmailID,
    to: user.email,
    subject: 'Thanks For Registration',
    html: generateEmailTemplate(user, activationLink), // Pass user object and activationLink
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendRegistrationEmail;
