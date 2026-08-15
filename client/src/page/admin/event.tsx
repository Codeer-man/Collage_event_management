import useAdmin from "../../feature/admin/useAdmin";
import CommonLoader from "../../components/common/loader";
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
import { useState } from "react";
import EventDialogue from "../../components/admin/event/event-detail-dialogue";

export default function Event() {
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof events)[number] | null
  >(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { events, eventloading, handleEvents } = useAdmin();

  if (eventloading) {
    return <CommonLoader />;
  }

  return (
    <div className="mx-4 py-6 md:mx-8 lg:mx-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Event Approval
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Review and manage events submitted for approval.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableCaption className="pb-4">
            List of events waiting for approval
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="h-12 px-6 font-semibold">Event</TableHead>

              <TableHead className="h-12 font-semibold">Location</TableHead>

              <TableHead className="h-12 font-semibold">Event Date</TableHead>

              <TableHead className="h-12 font-semibold">Type</TableHead>

              <TableHead className="h-12 pr-6 text-right font-semibold">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium">No events found</p>

                    <p className="text-sm text-muted-foreground">
                      There are currently no events waiting for approval.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
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
                        event.is_team_event
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}
                    >
                      {event.is_team_event ? "Team" : "Solo"}
                    </span>
                  </TableCell>

                  {/* Details */}
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedEvent(event);
                        setDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <EventDialogue
        event={selectedEvent}
        open={dialogOpen}
        handleEvents={handleEvents}
        onOpenChange={(open) => {
          setDialogOpen(open);

          if (!open) {
            setSelectedEvent(null);
          }
        }}
      />
    </div>
  );
}
