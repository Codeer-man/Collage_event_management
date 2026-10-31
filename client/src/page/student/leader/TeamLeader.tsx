import {
  Users,
  Crown,
  ArrowRight,
  Trophy,
  MapPin,
  CalendarDays,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import MemberManage from "../../../components/student/team/memberManage";
import TeamMembersList from "../../../components/student/team/teamMemberList";
import { useTeamStore } from "../../../feature/students/useTeam";
import { useEffect } from "react";

export default function TeamLeader() {
  const leaderTeam = useTeamStore((s) => s.leaderTeam);
  const getTeam = useTeamStore((s) => s.getTeam);
  useEffect(() => {
    void getTeam();
  }, [getTeam]);
  const teams = leaderTeam?.teams ?? [];

  if (teams.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center p-4">
        <Card className="w-full max-w-md rounded-2xl text-center shadow-sm">
          <CardContent className="py-12">
            <Crown className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold">No Team Found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You are not the leader of any team yet.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">My Teams</h1>
        </div>

        <p className="text-muted-foreground md:pl-14">
          Manage the teams you lead and view your members.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {teams.map((team) => {
          const memberCount = team.members.length;
          const maxMembers = team.max_participants;

          const hasLimit = maxMembers != null && Number(maxMembers) > 0;

          const progress = hasLimit
            ? Math.min((memberCount / Number(maxMembers)) * 100, 100)
            : 0;

          const isFull = hasLimit && memberCount >= Number(maxMembers);

          const startDate = team.event_date;
          const venue = team.location_name;

          return (
            <Card
              key={team.id}
              className="flex h-full min-h-[390px] flex-col rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader className="px-5 pb-5 pt-6 sm:px-6">
                <div className="flex items-start gap-4">
                  {team.image_url ? (
                    <img
                      src={team.image_url}
                      alt={team.title}
                      className="h-20 w-20 shrink-0 rounded-xl border object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1 pt-1">
                    <CardTitle className="break-words text-xl">
                      {team.team_name}
                    </CardTitle>

                    <CardDescription className="mt-2 line-clamp-2 text-sm">
                      Event: {team.title}
                    </CardDescription>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Team ID: #{team.id}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className="shrink-0 gap-1 rounded-full px-3 py-1"
                  >
                    <Crown className="h-3.5 w-3.5" />
                    Leader
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="mt-auto space-y-5 px-5 pb-6 sm:px-6">
                {/* Team capacity */}
                <div className="space-y-3 rounded-xl bg-muted/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-background p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">Team members</p>
                        <p className="text-xs text-muted-foreground">
                          {hasLimit
                            ? `${memberCount} of ${maxMembers} members`
                            : `${memberCount} members`}
                        </p>
                      </div>
                    </div>

                    {hasLimit && (
                      <Badge
                        variant={isFull ? "destructive" : "secondary"}
                        className="rounded-full px-3 py-1"
                      >
                        {memberCount}/{maxMembers}
                      </Badge>
                    )}
                  </div>

                  {hasLimit && (
                    <>
                      <div
                        className="h-2 overflow-hidden rounded-full bg-muted"
                        role="progressbar"
                        aria-label="Team capacity"
                        aria-valuemin={0}
                        aria-valuemax={Number(maxMembers)}
                        aria-valuenow={memberCount}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isFull ? "bg-destructive" : "bg-primary"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground">
                        {isFull
                          ? "Team is full"
                          : `${Number(maxMembers) - memberCount} ${
                              Number(maxMembers) - memberCount === 1
                                ? "spot"
                                : "spots"
                            } remaining`}
                      </p>
                    </>
                  )}
                </div>

                {/* Event details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex min-w-0 items-start gap-2.5">
                    <div className="shrink-0 rounded-lg bg-muted p-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-medium">Event Date</p>
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {startDate
                          ? new Date(startDate).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-0 items-start gap-2.5 border-l pl-3">
                    <div className="shrink-0 rounded-lg bg-muted p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <p className="text-sm font-medium">Event Venue</p>
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {venue || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Team management dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-11 w-full rounded-lg font-semibold shadow-sm transition-colors">
                      View &amp; manage team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="flex max-h-[85vh] flex-col overflow-hidden rounded-2xl sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="text-xl">
                        {team.team_name}
                      </DialogTitle>

                      <DialogDescription>
                        {team.title} · {memberCount} members
                        {hasLimit ? ` / ${maxMembers}` : ""}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold">Team members</h3>

                        <MemberManage
                          eventId={String(team.event_id)}
                          teamId={String(team.id)}
                          disabled={isFull}
                        />
                      </div>

                      {isFull && (
                        <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                          This team has reached its member limit.
                        </p>
                      )}

                      <TeamMembersList
                        members={team.members}
                        canManage={true}
                        emptyMessage="No team members yet."
                        leaderId={team.leader_id}
                        eventId={team.event_id}
                        teamId={team.id}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
