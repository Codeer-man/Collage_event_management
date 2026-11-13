import type { Pagination, student } from "../../../feature/admin/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import CommonLoader from "../../common/loader";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

export type listStsProps = {
  students: student[];
  loading: boolean;
  pagination: Pagination;
  onPageChange: (page: number) => void;
};

export default function ListStudents({
  students,
  loading,
  pagination,
  onPageChange,
}: listStsProps) {
  if (loading) {
    return <CommonLoader />;
  }

  const { page, totalPages, hasNextPage, hasPreviousPage } = pagination;

  return (
    <div className="flex min-h-[70vh] flex-col space-y-4">
      <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>List of the students</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground"
              >
                No students found.
              </TableCell>
            </TableRow>
          ) : (
            students.map((sts) => (
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

                <TableCell>
                  {sts.is_approved_student ? (
                    <Badge
                      variant="outline"
                      className="border-transparent bg-secondary text-secondary-foreground"
                    >
                      Approved
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-transparent bg-accent text-accent-foreground"
                    >
                      Pending review
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </div>
      {/* //pagination  */}
      <div className="mt-auto">
        {totalPages > 1 && (
          <PaginationComponent>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  size="default"
                  onClick={(e) => {
                    e.preventDefault();

                    if (hasPreviousPage) {
                      onPageChange(page - 1);
                    }
                  }}
                  className={
                    !hasPreviousPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* Pages */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      size="default"
                      isActive={pageNumber === page}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNumber);
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  size={"default"}
                  onClick={(e) => {
                    e.preventDefault();

                    if (hasNextPage) {
                      onPageChange(page + 1);
                    }
                  }}
                  className={
                    !hasNextPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </PaginationComponent>
        )}
      </div>
    </div>
  );
}
