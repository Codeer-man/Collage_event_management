import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { event } from "../../../feature/admin/types";

type EventDialogueProps = {
  event: event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleEvents: (status: boolean, eventId: string) => void;
};

export default function EventDialogue({
  event,
  open,
  onOpenChange,
  handleEvents,
}: EventDialogueProps) {
  if (!event) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>

          <DialogDescription>
            Review the complete event details before approving or declining this
            event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image */}
          <div className="overflow-hidden rounded-xl border">
            <img
              src={event.image_url}
              alt={event.title}
              className="h-56 w-full object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">Description</h3>

            <p className="text-sm leading-6 text-muted-foreground">
              {event.description}
            </p>
          </div>

          {/* Event Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Location</p>

              <p className="mt-1 font-medium">{event.location}</p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Contact</p>

              <p className="mt-1 font-medium">{event.contact}</p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Event Date</p>

              <p className="mt-1 font-medium">
                {new Date(event.event_date).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                Registration Deadline
              </p>

              <p className="mt-1 font-medium">
                {new Date(event.registration_deadline).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Event Type</p>

              <p className="mt-1 font-medium">
                {event.is_team_event ? "Team Event" : "Solo Event"}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                Maximum Participants
              </p>

              <p className="mt-1 font-medium">
                {event.max_participants ?? "Unlimited"}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Entry Fee</p>

              <p className="mt-1 font-medium">Rs. {event.entry_fee ?? 0}</p>
            </div>

            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Created By</p>

              <p className="mt-1 font-medium">{event.organizer_name}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="text-sm font-semibold">Current Status</p>

              <p className="text-xs text-muted-foreground">
                This event is waiting for your approval.
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium capitalize text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              {event.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => {
                handleEvents(false, event.id);
                onOpenChange(false);
              }}
            >
              Decline
            </Button>

            <Button
              className="cursor-pointer bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                handleEvents(true, event.id);
                onOpenChange(false);
              }}
            >
              Accept Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
