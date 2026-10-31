import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CalendarDays,
  CheckCheck,
  Inbox,
  MailOpen,
  Trash2,
} from "lucide-react";
import { useNotiStore } from "../../../feature/notification/store";
import NotificationItem from "../../../components/student/notification";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

export default function NotificationPage() {
  const getNoti = useNotiStore((state) => state.getNoti);
  const readNoti = useNotiStore((state) => state.readNoti);
  const deleteNoti = useNotiStore((state) => state.deleteNoti);
  const notificationList = useNotiStore((state) => state.notificationList);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    void getNoti();
  }, [getNoti]);

  // handle sort the read and unreadt message
  const sortedList = useMemo(() => {
    return [...notificationList].sort((a, b) => {
      if (a.read_status !== b.read_status) {
        return a.read_status ? 1 : -1;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [notificationList]);

  const unreadCount = useMemo(
    () => notificationList.filter((n) => !n.read_status).length,
    [notificationList],
  );

  // handle the selection
  const handleSelect = async (id: number) => {
    setSelectedId(id); // open the dialog immediately
    await readNoti(id); // load the notification + mark as read
    await getNoti(); // refresh list so the card style updates
  };

  // handle the read and unread card ui
  const renderCard = (item: (typeof notificationList)[number]) => {
    const id = Number(item.id);
    const date = new Date(item.created_at).toLocaleString();
    const unread = !item.read_status;

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => void handleSelect(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            void handleSelect(id);
          }
        }}
        className={`group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-xl border p-4 pl-5 transition hover:shadow-md ${
          unread
            ? "border-primary/40 bg-primary/[0.07] shadow-sm hover:border-primary/60"
            : "border-border bg-card hover:border-primary/30"
        }`}
      >
        {/* Left accent bar (unread only) */}
        {unread && (
          <span className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
        )}

        {/* Icon */}
        <div
          className={`rounded-full p-3 ${
            unread
              ? "bg-primary text-primary-foreground shadow"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {unread ? <BellRing size={20} /> : <MailOpen size={20} />}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {unread && (
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
            )}

            <h3
              className={`truncate ${
                unread
                  ? "text-base font-bold text-foreground"
                  : "text-base font-medium text-muted-foreground"
              }`}
            >
              {item.title}
            </h3>

            {unread && (
              <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                New
              </span>
            )}
          </div>

          <p
            className={`mt-1 line-clamp-2 text-sm ${
              unread
                ? "font-medium text-foreground/80"
                : "text-muted-foreground"
            }`}
          >
            {item.message}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {date}
            </span>

            {unread ? (
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Unread
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <CheckCheck size={14} />
                Read
              </span>
            )}
          </div>
        </div>

        {/* Delete */}
        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 hover:text-destructive ${
            unread ? "text-muted-foreground/40" : "text-muted-foreground"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // don't open the dialog
            if (unread) {
              toast.error(
                "Please click to read the message before deleting it",
              );
              return;
            }
            void deleteNoti(id);
          }}
          aria-label="Delete notification"
        >
          <Trash2 size={17} />
        </Button>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Page header */}
      <div className=" flex flex-row items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              Stay updated with your teams and events.
            </p>
          </div>
        </div>
        <Button
          className=" cursor-pointer"
          disabled={notificationList.length === 0}
          onClick={() => deleteNoti()}
        >
          Delete All
        </Button>
      </div>

      {/* Summary row */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Recent notifications</h2>
        <div className="flex items-center gap-2 text-sm">
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              {unreadCount} unread
            </span>
          )}
          <span className="text-muted-foreground">
            {notificationList.length} total
          </span>
        </div>
      </div>

      {/* List */}
      {sortedList.length > 0 ? (
        <div className="space-y-3">{sortedList.map(renderCard)}</div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Inbox size={28} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold">You're all caught up!</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            When there are updates about your teams and events, you'll see them
            here.
          </p>
        </div>
      )}

      {/* Single dialog for the whole page */}
      <NotificationItem
        open={selectedId !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedId(null);
        }}
        notificationId={selectedId}
      />
    </div>
  );
}
