// import { Resend } from "resend";
// import { textRequired } from "../utils/helper.js";
// import { AppError } from "../utils/AppError.js";

// interface enailProps {
//   to: string;
//   subject: string;
//   html: string;
// }

// const URI = process.env.RESEND_API_KEY;
// textRequired(URI, "resend .env not found");
// const resend = new Resend(URI);

// export async function sendEmail({ html, subject, to }: enailProps) {
//   const { data, error } = await resend.emails.send({
//     from: "Acme <onboarding@resend.dev>",
//     to: [to],
//     subject: subject,
//     html: html,
//   });

//   if (error) {
//     throw new AppError(500, `Resend Error: ${error}`);
//   }

//   return data;
// }

import nodemailer from "nodemailer";
import { AppError } from "../utils/AppError.js";

type enailProps = {
  html: string;
  subject: string;
  to: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_KEY,
  },
});

export async function sendEmail({ html, subject, to }: enailProps) {
  try {
    const info = await transporter.sendMail({
      from: `"CEMS" <nepaldai77@gmail.com>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    throw new AppError(500, `Brevo Error: ${error}`);
  }
}
