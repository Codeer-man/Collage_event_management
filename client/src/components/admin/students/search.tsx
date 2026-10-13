import { Search, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function SearchStudents({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <h2 className="text-sm font-semibold">Student directory</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Search students by name or email.
        </p>
      </div>
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search name or email…"
          aria-label="Search students by name or email"
          className="h-10 rounded-xl bg-background pl-9 pr-10"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
