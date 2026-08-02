import { adminModel } from "../model/admin/admin.modell.js";
import { AppError } from "../utils/AppError.js";

export const AdminService = {
  async getUnapprovedSts(facultyId: string) {
    const findStudents = await adminModel.findNotApprovedSts(facultyId);

    return findStudents;
  },
  async approveStudents(studentId: string, approve: boolean) {
    const approveStudent = await adminModel.approveSts(studentId, approve);

    if (!approveStudent) {
      throw new AppError(404, "user not found");
    }

    return approveStudent;
  },
};
