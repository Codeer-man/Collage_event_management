import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import CommonLoader from "../common/loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type {
  GetAllFaculty,
  updateFacultyBody,
} from "../../feature/administrative/faculty/types";

type facultyTableProps = {
  faculty: GetAllFaculty[];
  loading: boolean;
  onEdit: (value: updateFacultyBody) => void;
  onAssign: (faculty: string) => void;
};

export default function FacultyTable({
  onEdit,
  faculty,
  loading,
  onAssign,
}: facultyTableProps) {
  if (loading) {
    return <CommonLoader />;
  }

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <Table>
        <TableCaption className=" border-t-2 py-5 ">Faculty List</TableCaption>

        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Faculty</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Picture</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Edit</TableHead>
            <TableHead className="text-right">Assign</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {faculty.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-32 text-center text-muted-foreground"
              >
                No faculty found.
              </TableCell>
            </TableRow>
          ) : (
            faculty.map((faculty) => (
              <TableRow
                key={faculty.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium">
                  {faculty.faculty_name}
                </TableCell>

                <TableCell>
                  {faculty.full_name ?? (
                    <span className="text-muted-foreground">Not Assigned</span>
                  )}
                </TableCell>

                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={faculty.image_url ?? ""} />
                    <AvatarFallback>
                      {faculty.full_name?.charAt(0).toUpperCase() ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell>
                  {faculty.contact_number ?? (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onEdit({
                        faculty: faculty.faculty_name,
                        facultyId: faculty.id,
                      })
                    }
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell className="text-right">
                  <Button size="sm" onClick={() => onAssign(faculty.id)}>
                    Assign
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
