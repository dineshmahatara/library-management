const generateEmailTemplate = (user, activationLink) => {
    return `
      <html>
        <body>
          <h1>Hello ${user.name},</h1>
          <p>Thank you for registering in Library Management System with our platform as an ${user.role}.</p>
          <p>Your account details:</p>
          <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.email}</li>
            <li>Phone: ${user.phone}</li>
            <li>Province: ${user.province}</li>
            <li>Municipality: ${user.municipality}</li>
            <li>Password: ${user.password}</li>
          </ul>
          <p>Welcome aboard!</p>
          <p>Please <a href="${activationLink}">click here</a> to activate your account.</p>
        </body>
      </html>
    `;
  };
  
  module.exports = generateEmailTemplate;
  