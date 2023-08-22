// // emailMiddleware.js
// const nodemailer = require('nodemailer');
// const generateEmailTemplate = require('../templete/emailTemplate');

// const sendRegistrationEmail = (user, activationLink) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.gmailID,
//       pass: process.env.gmailPW,
//     },
//   });

//   const mailOptions = {
//     from: process.env.gmailID,
//     to: user.email,
//     subject: 'Thanks For Registration',
//     html: generateEmailTemplate(user, activationLink), // Pass user object and activationLink
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// module.exports = sendRegistrationEmail;
const nodemailer = require('nodemailer');

const sendEmail = (user, subject, htmlContent) => {
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
    subject: subject,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendEmail;
