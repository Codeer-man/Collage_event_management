import { UserModel } from "../model/auth/user.model.js";
import { facultyModel } from "../model/faculty/faculty.model.js";
import { AppError } from "../utils/AppError.js";
import { requireFound } from "../utils/helper.js";

export const AdministrativeService = {
  async asignFaculty(userId: string, faculty_id: string) {
    const findUser = await UserModel.findByField("id", userId);
    const existingUser = requireFound(findUser, "faculty not found") as {
      id: string;
      role: string;
    };

    if (existingUser.role === "admin") {
      throw new AppError(409, "User is already a admin of some other faculty");
    }

    const findFaculty = await facultyModel.findFaculty("id", faculty_id);
    const existingFaculty = requireFound(findFaculty, "faculty not found");

    const asignAdmin = await facultyModel.asignFacultyAdmin(
      existingUser.id,
      existingFaculty.id,
    );

    return asignAdmin;
  },
};
