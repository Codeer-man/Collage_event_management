import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useNotiStore } from "../../feature/notification/store";
import { Button } from "../ui/button";

export default function NotificationItem({
  notificationId,
  open,
  onOpenChange,
}: {
  notificationId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const notification = useNotiStore((state) => state.notification);
  const invitionDecision = useNotiStore((state) => state.invitionDecision);
  const isCurrent = notification && Number(notification.id) === notificationId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {isCurrent && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell size={20} className="text-primary" />
                {notification.title}
              </DialogTitle>
              <DialogDescription>
                Received on {new Date(notification.created_at).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7">
                {notification.message}
              </p>
            </div>

            {notification.entity_type && (
              <div className="flex items-center justify-between gap-3 border-t pt-4">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-muted-foreground">
                  {notification.entity_type.replaceAll("_", " ")}
                </span>

                {notification.type === "team_invitation" && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() =>
                        invitionDecision(
                          "reject",
                          Number(notification.entity_id),
                        )
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() =>
                        invitionDecision(
                          "accept",
                          Number(notification.entity_id),
                        )
                      }
                      size="sm"
                    >
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
