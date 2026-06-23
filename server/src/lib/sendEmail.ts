import { Resend } from "resend";
import { textRequired } from "../utils/helper.js";
import { AppError } from "../utils/AppError.js";

interface enailProps {
  to: string;
  subject: string;
  html: string;
}

const URI = process.env.RESEND_API_KEY;
textRequired(URI, "resend .env not found");
const resend = new Resend(URI);

export async function sendEmail({ html, subject, to }: enailProps) {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [to],
    subject: subject,
    html: html,
  });

  if (error) {
    throw new AppError(500, `Resend Error: ${error}`);
  }

  return data;
}
