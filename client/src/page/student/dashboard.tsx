import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  Clock3,
  MapPin,
  Plus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../../store/auth.store";
import {
  getSingleJoinedEvents,
  getTeamJoinedEvents,
} from "../../feature/students/api";
import { getYourEvents } from "../../feature/students/api";
import type { joinEventType, myEventType } from "../../feature/students/type";
import { Button } from "../../components/ui/button";

type DashboardData = {
  solo: joinEventType[];
  team: joinEventType[];
  created: myEventType[];
};

function dateLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date to be announced";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function StudentDashboard() {
  const user = useAuthStore((state) => state.user);
  const [data, setData] = useState<DashboardData>({
    solo: [],
    team: [],
    created: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      const results = await Promise.allSettled([
        getSingleJoinedEvents(),
        getTeamJoinedEvents(),
        getYourEvents(),
      ] as const);
      if (!active) return;
      setData({
        solo:
          results[0].status === "fulfilled"
            ? (results[0].value.events ?? [])
            : [],
        team:
          results[1].status === "fulfilled"
            ? (results[1].value.events ?? [])
            : [],
        created:
          results[2].status === "fulfilled"
            ? (results[2].value.myEvent ?? [])
            : [],
      });
      if (results.every((result) => result.status === "rejected")) {
        toast.error(
          "We couldn't load your event activity. Please try again later.",
        );
      }
      setLoading(false);
    }
    void loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const registeredEvents = useMemo(() => {
    const all = [...data.solo, ...data.team];
    return all
      .filter(
        (event) =>
          new Date(event.event_date).getTime() >= Date.now() - 86400000,
      )
      .sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
      )
      .slice(0, 3);
  }, [data]);

  const stats = [
    {
      label: "Registered events",
      value: data.solo.length + data.team.length,
      note: `${data.solo.length} solo · ${data.team.length} team`,
      icon: CalendarCheck,
    },
    {
      label: "Events created",
      value: data.created.length,
      note: "Events you've organized",
      icon: CalendarPlus,
    },
    {
      label: "Team registrations",
      value: data.team.length,
      note: "Events you're joining as a team",
      icon: Users,
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="page-wrap space-y-8">
        <section className="relative overflow-hidden rounded-3xl border border-[#d8e3d7] bg-[#e9f0e6] px-6 py-7 dark:border-[#3c5040] dark:bg-[#2c3a2f] sm:px-8 sm:py-9 lg:px-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-36 border-white/35 dark:border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-[#cdddc9]/55 blur-2xl dark:bg-[#4c6a50]/30" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/65 px-3 py-1 text-xs font-medium text-primary dark:bg-black/10 dark:text-[#c2d8c4]">
                <CalendarDays className="h-3.5 w-3.5" /> Your campus, all in one
                place
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-[#2d4535] dark:text-[#f0f5ed] sm:text-4xl">
                Good to see you, {user?.full_name?.split(" ")[0] || "there"}.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#627666] dark:text-[#c0cec0] sm:text-base">
                Find events that interest you, keep track of your registrations,
                and make more of your campus experience.
              </p>
            </div>
            <Button asChild className="h-11 shrink-0 rounded-xl px-5 shadow-sm">
              <Link to="/student/join/events">
                Explore events <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section
          aria-label="Event activity"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {stats.map(({ label, value, note, icon: Icon }) => (
            <div key={label} className="surface-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {loading ? (
                      <span className="inline-block h-8 w-10 animate-pulse rounded-md bg-muted align-middle" />
                    ) : (
                      value
                    )}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{note}</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="surface-card min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-lg font-semibold">Coming up</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your next registered events
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="shrink-0 rounded-lg"
              >
                <Link to="/student/registered">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {loading ? (
              <div className="space-y-3 p-5">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-19 animate-pulse rounded-xl bg-muted"
                  />
                ))}
              </div>
            ) : registeredEvents.length ? (
              <div className="divide-y divide-border">
                {registeredEvents.map((event) => (
                  <div
                    key={`${event.id}-${event.team_name ?? "solo"}`}
                    className="flex items-center gap-4 px-5 py-4 sm:px-6"
                  >
                    <div className="hidden h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted sm:block">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <CalendarDays className="m-auto h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {event.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5" />{" "}
                        {dateLabel(event.event_date)}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />{" "}
                        {event.location}
                      </p>
                    </div>
                    <span className="hidden rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium capitalize text-accent-foreground sm:inline-flex">
                      {event.status || "Registered"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center px-5 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-medium">
                  Nothing on your calendar yet
                </h3>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Explore campus events and register for something that
                  interests you.
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-xl">
                  <Link to="/student/join/events">
                    Browse events <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="surface-card p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Quick actions</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Shortcuts to things you do often.
              </p>
              <div className="mt-5 space-y-2">
                <QuickAction
                  to="/student/join/events"
                  icon={CalendarDays}
                  title="Find an event"
                  description="See what's happening on campus"
                />
                <QuickAction
                  to="/student/registered"
                  icon={CalendarCheck}
                  title="My registrations"
                  description="Review events you've joined"
                />
                <QuickAction
                  to="/student/create/events"
                  icon={Plus}
                  title="Create an event"
                  description="Share an activity with students"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold">A little reminder</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Check event details and registration status before attending.
                Some events may need approval from your faculty admin.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string;
  icon: typeof CalendarDays;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/60"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
