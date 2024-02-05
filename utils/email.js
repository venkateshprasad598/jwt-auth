const nodemailer = require("nodemailer");

//Send email fot forgot password
const sendEmail = async (options) => {
  // Create a transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Change this based on your email service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Your App <yourapp@example.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendEmail,
};
