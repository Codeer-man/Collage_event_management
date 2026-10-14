import {
  CalendarDays,
  MapPin,
  Users,
  CalendarX2,
  Clock,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "../../components/ui/card";

import { UseStudent } from "../../feature/students/useStudent";

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventList() {
  const { events, loading } = UseStudent();

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Faculty workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Event directory
            </h1>

            <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
              Discover college activities, upcoming events, and opportunities to
              participate.
            </p>
          </div>

          {!loading && events.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {events.length}
              </span>{" "}
              {events.length === 1 ? "event" : "events"} available
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <div className="h-48 animate-pulse bg-muted" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-16 animate-pulse rounded-xl bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          /* Empty state */
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-5 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <CalendarX2 className="h-6 w-6 text-muted-foreground" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">No events available</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              There are no events to display right now. Check back later for
              upcoming college activities.
            </p>
          </div>
        ) : (
          /* Event cards */
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 9).map((event) => {
              const startDate = new Date(event.event_date);
              const endDate = new Date(event.end_at);

              const isMultiDay =
                startDate.toDateString() !== endDate.toDateString();

              const isInternal = event.location_type === "internal";

              return (
                <Card
                  key={event.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {event.image_url ? (
                      <img
                        src={event.image_url}
                        alt={event.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/20 bg-background/90 px-3 py-1.5 text-xs font-semibold capitalize text-foreground shadow-sm backdrop-blur">
                        {event.status}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                        {String(event.is_team_event).toLowerCase() === "true"
                          ? "Team event"
                          : "Individual event"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardHeader className="space-y-2 pb-3">
                    <h2 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight">
                      {event.title}
                    </h2>

                    <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                      {event.description}
                    </p>
                  </CardHeader>

                  <CardContent className="mt-auto space-y-4">
                    {/* Venue */}
                    <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {isInternal ? "College venue" : "External venue"}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium">
                          {event.location_name || "Location not specified"}
                        </p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            {isMultiDay ? "Event duration" : "Event date"}
                          </p>

                          <p className="mt-0.5 text-sm font-medium">
                            {formatDate(event.event_date)}
                            {isMultiDay && <> — {formatDate(event.end_at)}</>}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Registration closes
                          </p>
                          <p className="mt-0.5 text-sm font-medium">
                            {formatDate(event.registration_deadline)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary" />
                        {event.max_participants
                          ? `${event.max_participants} max participants`
                          : "Open participation"}
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
