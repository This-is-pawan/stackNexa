const nodemailer = require("nodemailer");

const sendOtpMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"StackNexa" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendOtpMail;
