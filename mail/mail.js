
const nodemailer = require('nodemailer');
require('../app');

//nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yukialoha14@gmail.com',
        pass: process.env.MAIL_APP_PASS,
    },
});


const mailOptions = {
    from: 'yukialoha14@gmail.com',
    to: 'yukialoha14@gmail.com',
    subject: 'Test email',
    text: 'This is a test email.',
};


transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

