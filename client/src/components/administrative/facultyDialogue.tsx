import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type {
  createFacultyForm,
  updateFacultyBody,
} from "../../feature/administrative/faculty/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type dialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: updateFacultyBody | null;
  onSave: (value: createFacultyForm) => Promise<void>;
};

export default function FacultyDialogue({
  onOpenChange,
  onSave,
  faculty,
  open,
}: dialogProps) {
  const [name, setName] = useState<string>("");
  const editMode = !!faculty;

  useEffect(() => {
    if (!open) {
      setName("");
      return;
    }

    if (faculty) {
      setName(faculty.faculty);

      return;
    }

    setName("");
  }, [open, faculty]);

  async function submit() {
    try {
      await onSave({
        faculty: name,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit faculty name" : "Add faculty"}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="Enter faculty name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button onClick={submit}>{editMode ? "Edit" : "Add"} </Button>
      </DialogContent>
    </Dialog>
  );
}
