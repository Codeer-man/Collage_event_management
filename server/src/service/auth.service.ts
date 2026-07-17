import { getUrl } from "../lib/getUrl.js";
import { comaprePassword, hashPassword } from "../lib/hash.js";
import { sendEmail } from "../lib/sendEmail.js";
import { createAccessToken, createVerifyToken } from "../lib/token.js";
import { facultyModel } from "../model/faculty/faculty.model.js";
import { createUser, UserModel } from "../model/auth/user.model.js";
import { User } from "../types/auth/auth.types.js";
import { AppError } from "../utils/AppError.js";
import { uploadImage } from "../utils/cloudinary.js";
import { requireFound } from "../utils/helper.js";

async function sendVerificationEmail(userId: string, email: string) {
  const token = createVerifyToken(userId);
  const verifyUrl = `${getUrl()}/api/auth/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: `
      <div style="max-width:420px;margin:40px auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;font-family:Arial,sans-serif;text-align:center;background:#fff;">
        <h2 style="margin:0 0 12px;color:#111827;">Verify Your Email</h2>

        <p style="color:#4b5563;font-size:14px;line-height:1.6;">
          Thanks for signing up! Please verify your email to activate your account.
        </p>

        <a
          href="${verifyUrl}"
          style="display:inline-block;margin-top:12px;padding:10px 22px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;"
        >
          Verify Email
        </a>

        <p style="margin:20px 0 10px;color:#9ca3af;font-size:13px;">
          or
        </p>

        <p style="margin-top:20px;font-size:12px;color:#9ca3af;">
          If you didn't create this account, you can ignore this email.
        </p>
      </div>
    `,
  });
}

export const AuthService = {
  //register student

  async register(userData: createUser, file: Express.Multer.File) {
    if (userData.password.length < 6) {
      throw new AppError(400, "Password must be 6 character long");
    }

    if (userData.contact_number.length !== 10) {
      throw new AppError(500, "contact number must be 10 character long");
    }

    const exisitingUser = await UserModel.findByField("email", userData.email);

    if (exisitingUser) {
      throw new AppError(400, "Email already exist please try different email");
    }

    const findFaculty = await facultyModel.findFaculty(
      "id",
      userData.faculty_id,
    );

    const existingFaculty = requireFound(findFaculty, "faculty not found");

    if (!file) throw new AppError(400, "Profile image is required");
    const imageUpload = await uploadImage(file.buffer, "profile_publicId");
    const passwordHash = await hashPassword(userData.password);

    const newlyCreatedUser = await UserModel.create({
      full_name: userData.full_name,
      email: userData.email,
      password: passwordHash,
      role: "student",
      faculty_id: existingFaculty.id,
      image_url: imageUpload.url,
      public_id: imageUpload.public_id,
      contact_number: userData.contact_number,
      is_email_verified: false,
      is_approved_student: false,
    });

    await sendVerificationEmail(newlyCreatedUser.id, newlyCreatedUser.email);

    return newlyCreatedUser;
  },

  //login
  async login(email: string, password: string) {
    const user: User = await UserModel.findByField("email", email);
    const existingUser = requireFound(user, "user does not  exists exist", 404);

    const pwd = await comaprePassword(password, existingUser.password);

    if (!pwd) {
      throw new AppError(400, "Password does not match");
    }

    //verify email using resend if the email is not verified
    if (user.is_email_verified === false) {
      await sendVerificationEmail(existingUser.id, existingUser.email);
      return { verified: false };
    }

    //create jwt accessToken to stay logged in every refresh using cookies
    const accessToken = createAccessToken(existingUser.id, existingUser.role);
    return { verified: true, accessToken, user: existingUser };
  },
};
