require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = (emailAddress, emailData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.TRANSPORTER_EMAIL,
      pass: process.env.TRANSPORTER_PASS
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('server is reay to take your message');
    }
  })

  const mailBody = {
    from: `"Stayvista" <${process.env.TRANSPORTER_EMAIL}>`,
    to: emailAddress,
    subject: emailData.subject,
    html: emailData.message, // HTML body
  }

  transporter.sendMail(mailBody, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;