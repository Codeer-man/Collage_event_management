import { getUrl } from "../lib/getUrl.js";
import { comaprePassword, hashPassword } from "../lib/hash.js";
import { sendEmail } from "../lib/sendEmail.js";
import { createAccessToken, createVerifyToken } from "../lib/token.js";
import { facultyModel } from "../model/admin/faculty.model.js";
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
    subject: "Verify your Email",
    html: `<p>Please verify your email</p><br/><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });
}

export const AuthService = {
  //register student

  async register(userData: createUser, file: Express.Multer.File) {
    if (userData.password.length < 6) {
      throw new AppError(400, "Password must be 6 character long");
    }

    const exisitingUser = await UserModel.findByField("email", userData.email);

    if (exisitingUser) {
      throw new AppError(400, "Email already exist please try different email");
    }

    const findFaculty = await facultyModel.findFaculty(
      "faculty_name",
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
