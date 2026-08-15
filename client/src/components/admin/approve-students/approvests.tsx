import type { unApprovedSts } from "../../../feature/admin/types";
import CommonLoader from "../../common/loader";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

type approveProps = {
  unApprovedSts: unApprovedSts[];
  loading: boolean;
  handleStudentStatus: (userId: string, value: boolean) => Promise<void>;
};

export default function UnApprovedStudentsList({
  unApprovedSts,
  loading,
  handleStudentStatus,
}: approveProps) {
  if (loading) {
    return <CommonLoader />;
  }

  return (
    <div className=" mx-10">
      <Table>
        <TableCaption>List of the unApproved students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              <div>status</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {unApprovedSts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            unApprovedSts.map((sts) => (
              <TableRow
                key={sts.id}
                className="transition-colors hover:bg-muted/40"
              >
                <TableCell className="font-medium">{sts.full_name}</TableCell>

                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={sts.image_url ?? ""} />

                    <AvatarFallback>
                      {sts.full_name?.charAt(0).toUpperCase() ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell>{sts.contact_number}</TableCell>

                <TableCell>{sts.email}</TableCell>

                <TableCell className=" flex flex-col gap-3">
                  <Button
                    className="cursor-pointer bg-green-500"
                    onClick={() => handleStudentStatus(sts.id, true)}
                  >
                    Accept
                  </Button>
                  <Button
                    className=" cursor-pointer bg-red-500 text-white"
                    onClick={() => handleStudentStatus(sts.id, false)}
                  >
                    Decline
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
