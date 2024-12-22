import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const forgetpwd = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const templatePath = path.join(__dirname, `../templates/forgetPassword.html`);

  let htmlString = fs.readFileSync(templatePath, "utf8");
  htmlString = htmlString.replace(/{{name}}/g, options.name);
  htmlString = htmlString.replace(/{{email}}/g, options.email);
  htmlString = htmlString.replace(/{{role}}/g, options.role);
  htmlString = htmlString.replace(/{{store_name}}/g, options.store_name);
  htmlString = htmlString.replace(/{{link}}/g, options.link);

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: options.to,
    subject: options.subject,
    html: htmlString,
  };

  try {
    let emailSentInfo = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + emailSentInfo.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

export default forgetpwd;
