import { useEffect, useState } from "react";
import { findUserForAdmin } from "../../feature/administrative/faculty/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import useDebounce from "../../hooks/useDebounce";
import type { User } from "../../feature/administrative/faculty/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type assignFacultyProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facultyId: string;
  assignAdminControl: (facultyId: string, userId: string) => void;
};

export default function FacultyAdminAsignDialogue({
  onOpenChange,
  open,
  facultyId,
  assignAdminControl,
}: assignFacultyProps) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!open) return;

    if (debouncedSearch.trim() === "") {
      setUsers([]);
      return;
    }

    async function getUsers() {
      try {
        const response = await findUserForAdmin({
          facultyId,
          search: debouncedSearch,
        });
        setUsers(response.user);
      } catch (err) {
        console.error(err);
      }
    }

    getUsers();
  }, [debouncedSearch, facultyId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign admin</DialogTitle>
          <DialogDescription>
            Choose a user to assign for a faculty admin
          </DialogDescription>
        </DialogHeader>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter the name"
        />
        <Table>
          <TableCaption className="border-t-2 py-5">Users</TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Picture</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Assign</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image_url} />
                      <AvatarFallback>
                        {user.full_name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  <TableCell className="font-medium">
                    {user.full_name}
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => assignAdminControl(facultyId, user.id)}
                    >
                      Assign
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
