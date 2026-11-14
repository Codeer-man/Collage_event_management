import {
  Banknote,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Megaphone,
  MapPin,
  Pencil,
  Rocket,
  Users,
  UsersRound,
  Zap,
  XCircle,
  Activity,
} from "lucide-react";
import { useEventStore } from "../../feature/event/store";
import { useNavigate, useParams } from "react-router-dom";
import CommonLoader from "../../components/common/loader";
import ActivitySectoin from "../../components/events/activity";
import {
  ActionButton,
  daysLeft,
  formatDate,
  formatDeadline,
  formatWeekday,
  StatCard,
} from "../../components/events/helper";
import { useEffect } from "react";

export default function EventOverview() {
  const { event, getEventDetail, loading } = useEventStore((state) => state);
  const { eventId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    void getEventDetail(Number(eventId));
  }, [eventId, getEventDetail]);

  if (loading || event === null) {
    return <CommonLoader />;
  }

  //total participants
  const totalParticipants =
    (event.is_team_event
      ? event.total_team_members
      : event.total_solo_participants) ?? 0;

  const remainingDays = daysLeft(event.registration_deadline);
  const isOpen = event.status.toLowerCase() === "open" && remainingDays >= 0;

  const deadlineText =
    remainingDays < 0
      ? "Closed"
      : remainingDays === 0
        ? "Today"
        : `${remainingDays} day${remainingDays > 1 ? "s" : ""} left`;

  return (
    <div className="space-y-6">
      {/*  Event header  */}
      <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-4 shadow-sm md:flex-row md:p-5">
        <img
          src={event.image_url}
          alt={event.title}
          className="h-48 w-full rounded-xl object-cover md:h-auto md:w-80 md:shrink-0"
        />

        <div className="flex flex-1 flex-col justify-between gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="page-heading">{event.title}</h1>
              <p className="mt-2 text-muted-foreground">{event.description}</p>
            </div>

            <button
              type="button"
              //   onClick={onEdit}

              disabled={!isOpen}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Pencil className="h-4 w-4" />
              Edit Event
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>
                {formatDate(event.event_date)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                  ({formatWeekday(event.event_date)})
                </span>
              </span>
            </span>

            <span className="hidden h-5 w-px bg-border sm:block" />

            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {event.location_name}
            </span>

            <span className="hidden h-5 w-px bg-border sm:block" />

            <span className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              {event.entry_fee >= 0 ? `Rs. ${event.entry_fee}` : "Free"}
            </span>
          </div>

          <div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                isOpen
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {isOpen ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {isOpen ? "Registration Open" : "Registration Closed"}
            </span>
          </div>
        </div>
      </section>

      {/*  Stats  */}
      <section
        className={`grid gap-4 sm:grid-cols-2 ${
          event.is_team_event ? "xl:grid-cols-4" : "xl:grid-cols-3"
        }`}
      >
        <StatCard
          icon={<Users className="h-6 w-6" />}
          iconClass="bg-primary/10 text-primary"
          label="Total Participants"
          value={totalParticipants}
          hint={
            event.is_team_event
              ? "Across all teams"
              : "Individual registrations"
          }
        />

        {event.is_team_event && (
          <StatCard
            icon={<UsersRound className="h-6 w-6" />}
            iconClass="bg-secondary/10 text-secondary"
            label="Teams Registered"
            value={event.total_teams}
            hint="For team event"
          />
        )}

        <StatCard
          icon={<Activity className="h-6 w-6" />}
          iconClass="bg-green-500/10 text-green-600"
          label="Event Status"
          value={event.status}
          hint="Current event status"
        />

        <StatCard
          icon={<Calendar className="h-6 w-6" />}
          iconClass="bg-accent text-accent-foreground"
          label="Registration Deadline"
          value={deadlineText}
          valueClass={
            remainingDays <= 5 ? "text-destructive" : "text-foreground"
          }
          hint={formatDeadline(event.registration_deadline)}
        />
      </section>

      {/*  Activity + Quick actions  */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-3 text-lg font-semibold text-foreground">
              <Zap className="h-5 w-5 text-primary" />
              Recent Activity
            </h2>
            <button
              type="button"
              //   onClick={onViewAllActivity}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <ActivitySectoin />
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-foreground">
            <Rocket className="h-5 w-5 text-primary" />
            Quick Actions
          </h2>

          <div className="mt-5 space-y-3">
            <ActionButton
              variant="solid"
              icon={<Users className="h-5 w-5" />}
              label="View Participants"
              onClick={() => navigate(`/events/${eventId}/participants`)}
            />
            <ActionButton
              variant="outline"
              icon={<Pencil className="h-5 w-5" />}
              label="Edit Event"
              onClick={() => navigate(`/events/${eventId}/edit`)}
            />
            <ActionButton
              variant="outline"
              icon={<Megaphone className="h-5 w-5" />}
              label="Send Announcement"
              onClick={() => navigate(`/events/${eventId}/news`)}
            />
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-primary/5 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Tip</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                You can send an announcement to all registered participants
                about important updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
