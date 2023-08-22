// resetPasswordTemplate.js

const generateResetPasswordTemplate = (user, resetLink) => {
    return `
      <html>
        <body>
          <h1>Hello ${user.name},</h1>
          <p>We received a request to reset your password for your Library Management System account.</p>
          <p>If you did not request a password reset, please ignore this email. Otherwise, you can reset your password by clicking the link below:</p>
          <p><a href="${resetLink}">Reset Password</a></p>
          <p>The link is valid for the next 1 hour.</p>
          <p>If you have any questions, please contact our support team.</p>
          <p>Thank you!</p>
        </body>
      </html>
    `;
  };
  
  module.exports = generateResetPasswordTemplate;
  