const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailer.email,
    pass: config.mailer.password,
  },
});

const sendMail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: config.email,
      to,
      subject,
      text,
    });
    // eslint-disable-next-line no-console
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = {
  sendMail,
};
