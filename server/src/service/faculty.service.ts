import { facultyModel } from "../model/faculty/faculty.model.js";

export const facultyService = {
  //find faculty by name

  async findFacultyByName(facultyName: string) {
    return await facultyModel.findFaculty("faculty_name", facultyName);
  },
};
