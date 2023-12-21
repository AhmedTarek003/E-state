const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, msg) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GOOGLE_KEY,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: subject,
      html: msg,
    };
    transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Send email failed: ${error}`);
  }
};

module.exports = sendEmail;
