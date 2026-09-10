import { useState } from "react";
import { useTeamHandler } from "../../../feature/students/useTeam";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

type teamProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  eventId: number;
};

export default function CreateTeamDialog({
  title,
  onOpenChange,
  open,
  eventId,
}: teamProps) {
  const [teamName, setTeamName] = useState("");
  const { handleCreateteam } = useTeamHandler();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" w-full tracking-wide  text-lg ">
            Create your team for {title} Event{" "}
          </DialogTitle>
        </DialogHeader>
        <form
          className=" flex gap-2"
          onSubmit={() => handleCreateteam(eventId, teamName)}
        >
          <Input
            type="text"
            placeholder="Team Name"
            onChange={(e) => setTeamName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
