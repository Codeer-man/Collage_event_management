import { CalendarDays, MapPin, Users, CalendarX2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { UseStudent } from "../../feature/students/useStudent";

export default function EventList() {
  const { events, loading } = UseStudent();

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="page-wrap space-y-6">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Faculty workspace</p><h1 className="mt-2 text-3xl font-semibold">Event directory</h1><p className="mt-2 text-sm text-muted-foreground">Browse events currently available in CEMS.</p></div>
        {loading ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-muted" />)}</div> : events.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><CalendarX2 className="h-5 w-5" /></span><h2 className="mt-4 font-semibold">No events to show</h2><p className="mt-1 text-sm text-muted-foreground">Events will appear here when they are available.</p></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {events.slice(0, 9).map((event) => (
              <Card key={event.id} className="flex h-full flex-col overflow-hidden rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="h-44 w-full overflow-hidden bg-muted sm:h-48">{event.image_url ? <img src={event.image_url} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" /> : <div className="flex h-full items-center justify-center"><CalendarDays className="h-8 w-8 text-muted-foreground" /></div>}</div>
                <CardHeader className="pb-3"><div className="flex items-start justify-between gap-3"><CardTitle className="line-clamp-2 text-lg">{event.title}</CardTitle><span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium capitalize text-accent-foreground">{event.status}</span></div><CardDescription className="line-clamp-2 leading-5">{event.description}</CardDescription></CardHeader>
                <CardContent className="mt-auto space-y-3 text-sm text-muted-foreground"><div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-primary" /><span>{new Date(event.event_date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span></div><div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="truncate">{event.location}</span></div><div className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0 text-primary" /><span>{String(event.is_team_event).toLowerCase() === "true" ? "Team event" : "Individual event"}</span></div></CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
