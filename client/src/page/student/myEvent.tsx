import { useState } from "react";
import CommonLoader from "../../components/common/loader";
import EventsDetail from "../../components/student/myEvent/eventDetail";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { UseStudent } from "../../feature/students/useStudent";

export default function MyEvents() {
  const { muEvents, loading, cancelYourEvent } = UseStudent();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  if (loading) {
    return <CommonLoader />;
  }

  if (!muEvents) {
    return null;
  }

  return (
    <div className="mx-4 py-6 md:mx-8 lg:mx-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Events</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage Your events
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableCaption className="pb-4">Table caption here</TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="h-12 px-6 font-semibold">Event</TableHead>

              <TableHead className="h-12 font-semibold">Location</TableHead>

              <TableHead className="h-12 font-semibold">Event Date</TableHead>

              <TableHead className="h-12 font-semibold">Status</TableHead>

              <TableHead className="h-12 pr-6 text-right font-semibold">
                Details
              </TableHead>

              <TableHead className="h-12 pr-6 text-right font-semibold">
                Cancel
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {muEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium">No events found</p>

                    <p className="text-sm text-muted-foreground">
                      You have not created any event
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              muEvents.map((event) => (
                <TableRow
                  key={event.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  {/* Event */}
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="h-12 w-12 rounded-lg border object-cover"
                      />

                      <div className="min-w-0 max-w-52">
                        <p className="truncate font-medium">{event.title}</p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell className="text-muted-foreground">
                    {event.location}
                  </TableCell>

                  {/* Event Date */}
                  <TableCell>
                    {new Date(event.event_date).toLocaleDateString()}
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        event.status === "pending"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : event.status === "rejected"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </TableCell>

                  {/* Details */}
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      disabled={event.status !== "approved"}
                      onClick={() => setSelectedEvent(event.id!)}
                    >
                      open
                    </Button>
                  </TableCell>

                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => cancelYourEvent(event.id!)}
                      disabled={event.status === "cancelled"}
                    >
                      cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <EventsDetail
          event={selectedEvent}
          open={!!selectedEvent}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedEvent(null);
            }
          }}
        />
      </div>
    </div>
  );
}
