import { UserModel } from "../model/auth/user.model.js";
import { AppError } from "../utils/AppError.js";
import { requireFound } from "../utils/helper.js";

export async function findAdmin(id: string) {
  const findAdmin = await UserModel.findByField("id", id);

  const foundAdmin = requireFound(findAdmin, "Admin not found");

  if (foundAdmin.role !== "admin") {
    throw new AppError(429, "can only be accessed by the admin");
  }

  return foundAdmin;
}

export async function findStudent(id: string) {
  const existingUser = await UserModel.findByField("id", id);

  const foundUser = requireFound(existingUser, "user not found");

  return foundUser;
}
