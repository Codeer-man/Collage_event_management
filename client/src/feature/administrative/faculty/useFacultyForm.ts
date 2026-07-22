import { useEffect, useMemo, useState } from "react";
import type {
  createFacultyForm,
  GetAllFaculty,
  updateFacultyBody,
} from "./types";
import {
  createFaculty,
  getAllFaculty,
  updateFacultyName,
  assignAdmin,
} from "./api";
import { toast } from "sonner";

export default function UseFacultyForm() {
  const [allFaculty, setAllFacluty] = useState<GetAllFaculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [openFacultyDialog, setOpenFacultyDialog] = useState(false);
  const [openAssignAdminDialogue, setOpenAssignAdminDialogue] = useState(false);
  const [editFaculty, setEditFaculty] = useState<updateFacultyBody | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [selectFacultyId, setSelectedFacultyId] = useState("");

  //get faculty
  async function getFaculty() {
    setLoading(true);
    try {
      const response = await getAllFaculty();

      setAllFacluty(response.faculty);
    } finally {
      setLoading(false);
    }
  }

  const filterFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return allFaculty;

    return allFaculty.filter((faculty) => {
      const name = faculty.faculty_name
        .toLowerCase()
        .replace(/^bachelor\s+in\s+/, "");

      return name.includes(query);
    });
  }, [search, allFaculty]);

  function openCreateDialogue() {
    setOpenFacultyDialog(true);
    setEditFaculty(null);
  }

  function closeCreateDialogue() {
    setOpenFacultyDialog(false);
    setEditFaculty(null);
  }

  function openUpdateFacultyDialgue(value: updateFacultyBody) {
    setOpenFacultyDialog(true);
    setEditFaculty(value);
  }

  function openAssignAdmin(facultyId: string) {
    setOpenAssignAdminDialogue(true);
    setSelectedFacultyId(facultyId);
  }
  async function saveFaculty(value: createFacultyForm) {
    if (selectFacultyId.trim() === "") return;
    setLoading(true);
    try {
      const response = editFaculty
        ? updateFacultyName({
            faculty: value.faculty,
            facultyId: editFaculty.facultyId,
          })
        : createFaculty(value);

      toast.promise(response, {
        loading: editFaculty ? "Updating name" : "Addming faculty",
        success: () => {
          getFaculty();
          closeCreateDialogue();
          return editFaculty ? "Updated successfully" : "Added successfully";
        },
        error: (error: unknown) => {
          return error instanceof Error
            ? error.message
            : "something went wrong";
        },
      });
    } finally {
      setLoading(false);
    }
  }

  async function assignAdminControl(facultyId: string, userId: string) {
    setLoading(true);
    try {
      const response = assignAdmin({ facultyId, userId });

      toast.promise(response, {
        loading: "Searching",
        success: () => {
          setOpenAssignAdminDialogue(false);
          return "The user has been successfully assigned as admin";
        },
        error: (error) => {
          return error instanceof Error
            ? error.message
            : "Something went wrong";
        },
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFaculty();
  }, []);

  return {
    filterFaculty,
    loading,
    search,
    setSearch,
    openFacultyDialog,
    setOpenFacultyDialog,
    editFaculty,
    setEditFaculty,
    openCreateDialogue,
    closeCreateDialogue,
    openUpdateFacultyDialgue,
    saveFaculty,
    assignAdminControl,
    setOpenAssignAdminDialogue,
    openAssignAdminDialogue,
    openAssignAdmin,
    selectedFacultyId: selectFacultyId,
  };
}
