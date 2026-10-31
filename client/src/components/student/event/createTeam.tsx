import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { useTeamStore } from "../../../feature/students/useTeam";

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
  const handleCreateteam = useTeamStore((s) => s.handleCreateteam);
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
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateteam(eventId, teamName);
          }}
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
