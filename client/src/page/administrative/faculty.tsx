import FacultyTable from "../../components/administrative/facultyTable";
import FacultyDialogue from "../../components/administrative/facultyDialogue";
import FacultyToolBar from "../../components/administrative/facultyTookbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import UseFacultyForm from "../../feature/administrative/faculty/useFacultyForm";
import FacultyAdminAsignDialogue from "../../components/administrative/facultyAdminAsignDialogue";

export default function Faculty() {
  const {
    editFaculty,
    openFacultyDialog,
    setOpenFacultyDialog,
    closeCreateDialogue,
    openCreateDialogue,
    openUpdateFacultyDialgue,
    filterFaculty,
    loading,
    search,
    setSearch,
    saveFaculty,
    assignAdminControl,
    setOpenAssignAdminDialogue,
    openAssignAdmin,
    openAssignAdminDialogue,
    selectedFacultyId,
  } = UseFacultyForm();

  return (
    <div className=" space-y-6 p-3">
      <Card>
        <CardHeader>
          <CardTitle> Faculty</CardTitle>
        </CardHeader>
        <CardContent>
          <FacultyToolBar
            onAddFaculty={openCreateDialogue}
            onSearchChange={setSearch}
            search={search}
          />
        </CardContent>
      </Card>
      <div>
        <FacultyTable
          faculty={filterFaculty}
          loading={loading}
          onEdit={openUpdateFacultyDialgue}
          onAssign={openAssignAdmin}
        />
      </div>
      <FacultyDialogue
        open={openFacultyDialog}
        onOpenChange={(open) => {
          if (!open) {
            closeCreateDialogue();
            return;
          }

          setOpenFacultyDialog(true);
        }}
        faculty={editFaculty}
        onSave={saveFaculty}
      />
      <FacultyAdminAsignDialogue
        open={openAssignAdminDialogue}
        onOpenChange={setOpenAssignAdminDialogue}
        facultyId={selectedFacultyId}
        assignAdminControl={assignAdminControl}
      />
    </div>
  );
}
