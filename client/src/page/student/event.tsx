import { CalendarDays } from "lucide-react";
import EventPresentList from "../../components/student/event/listEvent";
import { UseStudent } from "../../feature/students/useStudent";

export default function Events() {
  const { events, loading } = UseStudent();

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="page-wrap space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Discover
            </p>
            <h1 className="mt-2 text-3xl font-semibold">Explore events</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Find upcoming campus activities, review event details, and
              register for the ones that interest you.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-xl bg-accent px-3 py-2 text-sm font-medium text-accent-foreground sm:self-auto">
            <CalendarDays className="h-4 w-4" />{" "}
            {loading ? "Loading events" : `${events.length} events listed`}
          </div>
        </div>
        <EventPresentList events={events} loading={loading} />
      </div>
    </div>
  );
}
