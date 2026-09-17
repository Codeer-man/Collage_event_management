import {
  CalendarDays,
  Contact,
  MapPin,
  User,
  Users,
  Clock3,
  Group,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import {
  getSingleJoinedEvents,
  getTeamJoinedEvents,
} from "../../feature/students/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { joinEventType } from "../../feature/students/type";

function EventCard({ event }: { event: joinEventType }) {
  const eventDate = new Date(event.event_date);

  return (
    <Card className="group overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${
              event.status === "approved"
                ? "bg-green-500/90 text-white"
                : event.status === "pending"
                  ? "bg-yellow-500/90 text-white"
                  : event.status === "cancelled"
                    ? "bg-red-500/90 text-white"
                    : "bg-black/70 text-white"
            }`}
          >
            {event.status}
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>

        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <CalendarDays className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-medium">
                {eventDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <MapPin className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="truncate font-medium">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <Contact className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Contact</p>
              <p className="font-medium">+977 {event.contact}</p>
            </div>
          </div>

          {event.is_team_event ? (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                <Group className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Team Name</p>
                <p className="font-medium"> {event.team_name}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Registered badge */}
        <div className="mt-5 flex items-center gap-2 border-t pt-4 text-sm font-medium">
          <Clock3 className="h-4 w-4" />
          <span>Registered Event</span>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyEvents({ team = false }: { team?: boolean }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center px-5 py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          {team ? (
            <Users className="h-5 w-5 text-muted-foreground" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        <h3 className="font-medium">No {team ? "team" : "solo"} events yet</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          You haven't registered for any {team ? "team" : "solo"} events yet.
        </p>
      </CardContent>
    </Card>
  );
}

export default function EventRegistered() {
  const [soloEvents, setSoloEvents] = useState<joinEventType[]>([]);
  const [teamEvents, setTeamEvents] = useState<joinEventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [singleResponse, teamResponse] = await Promise.all([
          getSingleJoinedEvents(),
          getTeamJoinedEvents(),
        ]);

        setSoloEvents(singleResponse.events);
        setTeamEvents(teamResponse.events);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }

        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Registered Events
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Keep track of the events you've joined.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:max-w-md">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <User className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-bold">{soloEvents.length}</p>
                <p className="text-xs text-muted-foreground">Solo Events</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-bold">{teamEvents.length}</p>
                <p className="text-xs text-muted-foreground">Team Events</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solo Events */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <User className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Solo Events</h2>
              <p className="text-sm text-muted-foreground">
                Events you joined individually
              </p>
            </div>
          </div>

          {soloEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {soloEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyEvents />
          )}
        </section>

        {/* Team Events */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Team Events</h2>
              <p className="text-sm text-muted-foreground">
                Events you joined as a team
              </p>
            </div>
          </div>

          {teamEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {teamEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyEvents team />
          )}
        </section>
      </div>
    </div>
  );
}
