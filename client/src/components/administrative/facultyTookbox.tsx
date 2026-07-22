import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type facultyToolbar = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddFaculty: () => void;
};

export default function FacultyToolBar({
  onAddFaculty,
  onSearchChange,
  search,
}: facultyToolbar) {
  return (
    <div className=" flex items-center justify-between ">
      <Search
        className={
          "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        }
      />

      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className=" w-xl"
        placeholder="Search Faculty, Ignore bachelour in"
      />

      <Button onClick={onAddFaculty}>Create Faculty</Button>
    </div>
  );
}
