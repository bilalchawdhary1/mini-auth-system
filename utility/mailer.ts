import User from "@/models/userModels";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  emailType: string,
  userId: string
) => {
  console.log(email, emailType, userId);
  try {
    const hashedToken = crypto.randomBytes(32).toString("hex");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: "YKj6a@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};
