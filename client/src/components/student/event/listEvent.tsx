import type { joinEventType } from "../../../feature/students/type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { CalendarDays, CalendarX2, MapPin, Users } from "lucide-react";
import { useState } from "react";
import CreateTeamDialog from "./createTeam";
import { toast } from "sonner";
import { joinSingleEvent, joinTeamEvent } from "../../../feature/students/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";

type eventProps = {
  events: joinEventType[];
  loading: boolean;
};

export default function EventPresentList({ events, loading }: eventProps) {
  const [open, setOpen] = useState(false);
  const [title, setEventTitle] = useState("");
  const [id, setEventId] = useState<number>();
  const [teamId, setTeamId] = useState<string>("");
  const visibleEvents = events.filter((event) => event.status !== "cancelled");

  if (loading) {
    return (
      <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="h-44 animate-pulse bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-10 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  async function handleEventJoin(teamEvent = false, eventId: number) {
    try {
      if (teamEvent) {
        //team event
        await joinTeamEvent({ eventId, teamId });
        toast.success("Your team have successfully joined the event ");
      } else {
        // solo event
        await joinSingleEvent(eventId);
        toast.success("You have successfully joined the event ");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      console.error(error);
    }
  }

  return (
    <div className="w-full">
      {visibleEvents.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-5 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <CalendarX2 className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-semibold">No events available</h2>
          <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
            There are no events to display right now. Check back later for new
            campus activities.
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleEvents.slice(0, 9).map((event) => (
            <Card
              key={event.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border-border shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Image */}
              <div className="h-44 w-full overflow-hidden bg-muted sm:h-48">
                {event.image_url ? (
                  <img
                    src={event.image_url}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <CalendarDays className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1 text-lg">
                    {event.title}
                  </CardTitle>

                  <span className="shrink-0 rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground">
                    {event.status}
                  </span>
                </div>

                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{new Date(event.event_date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>
                    {String(event.is_team_event).toLowerCase() === "true"
                      ? "Team Event"
                      : "Individual Event"}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                {String(event.is_team_event).toLowerCase() === "true" ? (
                  <div className=" w-full  justify-between items-center  gap-3">
                    <Button
                      disabled={event.status !== "approved"}
                      onClick={() => {
                        (setOpen(true),
                          setEventTitle(event.title),
                          setEventId(event.id));
                      }}
                      className="w-full"
                    >
                      Create team{" "}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          disabled={event.status !== "approved"}
                          className=" w-full"
                        >
                          Join Event
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Join Team Event</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          <Input
                            type="text"
                            placeholder="Enter team Id"
                            value={teamId}
                            onChange={(e) => setTeamId(e.target.value)}
                          />

                          <Button
                            className="w-full"
                            onClick={() => handleEventJoin(true, event.id)}
                          >
                            Join Event
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  <Button
                    disabled={event.status !== "approved"}
                    onClick={() => handleEventJoin(false, event.id)}
                    className="w-full"
                  >
                    {" "}
                    Join Event
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <CreateTeamDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        eventId={id!}
      />
    </div>
  );
}
