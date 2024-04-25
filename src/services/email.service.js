const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) => {
      console.log("🚀 ~ err:", err);
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      );
    });
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, pdf) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
  };
  if (pdf) msg.attachments = [{ filename: "order_detail.pdf", content: pdf }];
  await transport.sendMail(msg);
};
/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = "Reset password",
    // replace this url with the link to the reset password page of your front-end app
    resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`,
    text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};
/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = "Email Verification",
    // replace this url with the link to the email verification page of your front-end app
    verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`,
    text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
};
