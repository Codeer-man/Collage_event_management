import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useTeamHandler } from "../../../feature/students/useTeam";
import { useState } from "react";

export default function MemberManage({
  eventId,
  teamId,
  disabled = false,
}: {
  eventId: string;
  teamId: string;
  disabled?: boolean;
}) {
  const { handleAddMember, getTeam, getUserForTeam, users } = useTeamHandler();

  const [name, setName] = useState("");

  return (
    <Dialog onOpenChange={() => getTeam}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Invite students</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Enter Student full name to get the result fast
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUserForTeam(name);
          }}
        >
          <div className="flex items-center space-x-4 w-full">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1"
            />

            <Button type="submit">Find Student</Button>
          </div>
        </form>

        {users && users.length > 0 ? (
          <div className="divide-y divide-border rounded-md border p-2 bg-muted/20">
            {users.map((user, index) => (
              <div
                key={index || user.full_name}
                className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
              >
                <div className="flex items-center space-x-3">
                  {user.image_url && (
                    <img
                      src={user.image_url}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {user.full_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.faculty_name}
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleAddMember(eventId, teamId, user.id)}
                >
                  Send Invitation
                </Button>
              </div>
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
