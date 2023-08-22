// activateTemplate.js

const generateEmailTemplate = (user, activationLink) => {
    return `
      <html>
        <body>
          <h1>Hello ${user.name},</h1>
          <p>Welcome to the Library Management System!</p>
          <p>Please <a href="${activationLink}">click here</a> to activate your account.</p>
          <p>The link is valid for the next 1 hour.</p>
          <p>If you have any questions, please contact our support team.</p>
          <p>Thank you!</p>
        </body>
      </html>
    `;
  };
  
  module.exports = generateEmailTemplate;
  