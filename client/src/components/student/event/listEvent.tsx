import type { joinEventType } from "../../../feature/students/type";
import CommonLoader from "../../common/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
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

  if (loading) {
    return <CommonLoader />;
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
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {events.slice(0, 6).map((event) => (
        <Card key={event.id} className="flex h-full flex-col overflow-hidden">
          {/* Image */}
          <div className="h-90 w-full overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="line-clamp-1 text-lg">
                {event.title}
              </CardTitle>

              <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
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
                {event.is_team_event ? "Team Event" : "Individual Event"}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            {event.is_team_event ? (
              <div className=" flex items-center gap-5 justify-between">
                <Button
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
                        type="string"
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

      <CreateTeamDialog
        open={open}
        onOpenChange={setOpen}
        title={title}
        eventId={id!}
      />
    </div>
  );
}
