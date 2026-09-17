import { CalendarDays, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { UseStudent } from "../../feature/students/useStudent";
import { Button } from "../../components/ui/button";

export default function EventList() {
  const { events } = UseStudent();

  return (
    <div className=" py-3 px-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
        </Card>
      ))}
    </div>
  );
}
