import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export const formatDate = (iso: Date) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatWeekday = (iso: Date) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "short" });

export const formatDeadline = (iso: Date) => {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} • ${time}`;
};

export const daysLeft = (iso: Date) => {
  const diff = new Date(iso).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const timeAgo = (iso: string) => {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

// export const activityIcon: Record<ActivityType, ReactNode> = {
//   participant: <UserPlus className="h-5 w-5" />,
//   team: <UsersRound className="h-5 w-5" />,
//   news: <Megaphone className="h-5 w-5" />,
//   update: <Settings className="h-5 w-5" />,
// };

//buuilding blocks
export function StatCard({
  icon,
  iconClass,
  label,
  value,
  valueClass = "text-foreground",
  hint,
}: {
  icon: ReactNode;
  iconClass: string;
  label: string;
  value: ReactNode;
  valueClass?: string;
  hint: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className={`text-3xl font-bold leading-tight ${valueClass}`}>
          {value}
        </p>
        <p className="truncate text-xs text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}

export function ActionButton({
  icon,
  label,
  onClick,
  variant,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant: "solid" | "outline";
}) {
  const styles = variant === "solid";
  ("border-2 border-primary/30 bg-card text-primary hover:bg-primary/5");

  return (
    <button
      type="button"
      onClick={onClick}
      className={` border-2 flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${styles}`}
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}
