import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import CommonLoader from "../../components/common/loader";
import useAdmin from "../../feature/admin/useAdmin";

export default function ApproveStudents() {
  const { unApproved, loading, handleStudentStatus } = useAdmin();

  if (loading) {
    return <CommonLoader />;
  }

  return (
    <div className="mx-4 md:mx-8 lg:mx-10 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Approve Students
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage students waiting for approval.
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableCaption className="pb-4">
            List of students waiting for approval
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="h-12 px-6 font-semibold">Name</TableHead>

              <TableHead className="h-12 font-semibold">Image</TableHead>

              <TableHead className="h-12 font-semibold">Contact</TableHead>

              <TableHead className="h-12 font-semibold">Email</TableHead>
              <TableHead className="h-12 font-semibold">
                email verified
              </TableHead>

              <TableHead className="h-12 pr-6 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {unApproved.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium">No students found</p>

                    <p className="text-sm text-muted-foreground">
                      There are currently no students waiting for approval.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              unApproved.map((student) => (
                <TableRow
                  key={student.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  {/* Name */}
                  <TableCell className="px-6 py-4">
                    <span className="font-medium">{student.full_name}</span>
                  </TableCell>

                  {/* Avatar */}
                  <TableCell>
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage
                        src={student.image_url ?? ""}
                        alt={student.full_name}
                      />

                      <AvatarFallback className="font-medium">
                        {student.full_name?.charAt(0).toUpperCase() ?? "A"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="text-muted-foreground">
                    {student.contact_number}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-muted-foreground">
                    {student.email}
                  </TableCell>
                  {/* Email */}
                  <TableCell className="text-muted-foreground">
                    {student.is_email_verified ? "true" : "false"}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-6">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="cursor-pointer bg-green-600 text-white shadow-sm transition-all hover:bg-green-700 hover:shadow"
                        disabled={!student.is_email_verified}
                        onClick={() => handleStudentStatus(student.id, true)}
                      >
                        Accept
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer shadow-sm transition-all hover:shadow"
                        onClick={() => handleStudentStatus(student.id, false)}
                      >
                        Decline
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
