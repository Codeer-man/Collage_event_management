import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, CalendarDays, Crown } from "lucide-react";
import { getTeamYouAreIn } from "../../feature/students/api";

type Team = {
  id: number;
  team_name: string;
  event_id: number;
  event_title: string;
  event_image: string;
  event_date: string;
  leader_name: string;
};

type TeamResponse = {
  success: boolean;
  leader: boolean;
  team: Team[];
};

export default function Team() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = (await getTeamYouAreIn()) as TeamResponse;

        setTeams(response.team);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);
  console.log(teams);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Loading teams...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Teams</h1>
          <p className="text-muted-foreground">
            Teams you are currently a member of.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {teams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">You are not in any team</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create or be a participate in a team to join a team event team
              events.
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Team cards */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              {/* Event image */}
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={team.event_image}
                  alt={team.event_title}
                  className="h-full w-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{team.team_name}</CardTitle>

                    <CardDescription className="mt-1">
                      {team.event_title}
                    </CardDescription>
                  </div>

                  <Badge variant="secondary">Team</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Event date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />

                  <span>{new Date(team.event_date).toLocaleDateString()}</span>
                </div>

                {/* Leader */}
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-xs text-muted-foreground">Team Leader</p>

                    <p className="font-medium">{team.leader_name}</p>
                  </div>
                </div>

                {/* Button */}
                <Button variant="outline" className="w-full">
                  View Team
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
