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
import {
  CalendarDays,
  CalendarX2,
  MapPin,
  Users,
  Clock,
  Wallet,
  UserRound,
  ArrowRight,
  UsersRound,
} from "lucide-react";
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

function formatDate(value?: string) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(value?: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventPresentList({ events, loading }: eventProps) {
  const [open, setOpen] = useState(false);
  const [title, setEventTitle] = useState("");
  const [id, setEventId] = useState<number>();
  const [teamId, setTeamId] = useState("");

  const visibleEvents = events.filter((event) => event.status !== "cancelled");

  async function handleEventJoin(teamEvent: boolean, eventId: number) {
    try {
      if (teamEvent) {
        if (!teamId.trim()) {
          toast.error("Please enter a team ID");
          return;
        }

        await joinTeamEvent({
          eventId,
          teamId: teamId.trim(),
        });

        toast.success("Your team has successfully joined the event");
        setTeamId("");
      } else {
        await joinSingleEvent(eventId);
        toast.success("You have successfully joined the event");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="h-48 animate-pulse bg-muted" />
            <div className="space-y-4 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              <div className="h-16 animate-pulse rounded-xl bg-muted" />
              <div className="h-10 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visibleEvents.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-5 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <CalendarX2 className="h-6 w-6" />
        </span>

        <h2 className="mt-4 text-lg font-semibold">No events available</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          There are no events to join right now. Check back later for upcoming
          campus activities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {visibleEvents.slice(0, 9).map((event) => {
        const isTeamEvent =
          String(event.is_team_event).toLowerCase() === "true";

        const isApproved = event.status === "approved";

        return (
          <Card
            key={event.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Event image */}
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm">
                {event.status}
              </span>

              <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                {isTeamEvent ? (
                  <UsersRound className="h-3.5 w-3.5" />
                ) : (
                  <UserRound className="h-3.5 w-3.5" />
                )}
                {isTeamEvent ? "Team event" : "Individual"}
              </span>

              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-xs font-medium text-white/80">
                  UPCOMING EVENT
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {event.title}
                </p>
              </div>
            </div>

            {/* Event heading */}
            <CardHeader className="space-y-2 pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="line-clamp-2 text-lg leading-6">
                  {event.title}
                </CardTitle>
              </div>

              <CardDescription className="line-clamp-3 min-h-[60px] leading-5">
                {event.description || "No event description provided."}
              </CardDescription>
            </CardHeader>

            {/* Event information */}
            <CardContent className="flex-1 space-y-4">
              <div className="rounded-xl bg-muted/50 p-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
                    <CalendarDays className="h-4 w-4" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Event date</p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {formatDate(event.event_date)}
                    </p>

                    {event.end_at && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(event.event_date)}
                        {formatTime(event.event_date) &&
                          formatTime(event.end_at) &&
                          " – "}
                        {formatTime(event.end_at)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Venue</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                      {event.location_name || "Location not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">Entry fee</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {Number(event.entry_fee ?? 0) === 0
                        ? "Free"
                        : `Rs. ${Number(event.entry_fee).toLocaleString()}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Maximum participants
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {event.max_participants ?? "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Registration deadline
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {formatDate(event.registration_deadline)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Join actions */}
            <CardFooter className="flex-col gap-2 border-t border-border pt-4">
              {isTeamEvent ? (
                <>
                  <Button
                    disabled={!isApproved}
                    onClick={() => {
                      setEventTitle(event.title);
                      setEventId(event.id);
                      setOpen(true);
                    }}
                    className="w-full"
                  >
                    Create a team
                    <UsersRound className="ml-2 h-4 w-4" />
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={!isApproved}
                        className="w-full"
                      >
                        Join an existing team
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Join a team</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Enter the team ID shared by your team leader to join
                          this event.
                        </p>

                        <Input
                          type="text"
                          placeholder="Enter team ID"
                          value={teamId}
                          onChange={(e) => setTeamId(e.target.value)}
                        />

                        <Button
                          className="w-full"
                          onClick={() => handleEventJoin(true, event.id)}
                        >
                          Join team
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button
                  disabled={!isApproved}
                  onClick={() => handleEventJoin(false, event.id)}
                  className="w-full"
                >
                  Join event
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {!isApproved && (
                <p className="text-center text-xs text-muted-foreground">
                  Joining will be available when this event is approved.
                </p>
              )}
            </CardFooter>
          </Card>
        );
      })}
      <CreateTeamDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        eventId={id!}
      />
    </div>
  );
}
