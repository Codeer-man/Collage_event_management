import CommonLoader from "../../../components/common/loader";
import { UseStudent } from "../../../feature/students/useStudent";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MyEvents() {
  const { muEvents, loading, cancelYourEvent } = UseStudent();

  const navigate = useNavigate();

  if (loading) {
    return <CommonLoader />;
  }

  return (
    <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <p className="eyebrow">Organizer workspace</p>
        <h1 className="page-heading mt-2">Events I manage</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Review your submissions, event details, and approval status.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableCaption className="pb-4">Event Management</TableCaption>

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
            {!muEvents?.length ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
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
                    {event.location_name}
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
                          ? "bg-accent text-accent-foreground"
                          : event.status === "rejected"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-secondary text-secondary-foreground"
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
                      onClick={() => navigate(`/events/${event.id}/manage`)}
                    >
                      Open
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
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
