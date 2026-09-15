import { useState } from "react";
import { Users, Crown, Calendar, Trash2 } from "lucide-react";
import { useTeamHandler } from "../../feature/students/useTeam";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { manageMember } from "../../feature/students/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function LeaderTeam() {
  const { leaderTeam } = useTeamHandler();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleAddMember = async (eventId: string, teamId: string) => {
    try {
      await manageMember({ eventId, teamId, email });
      toast.success("Add successfully");
      setEmail("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleRemove = async (
    eventId: string,
    teamId: string,
    userId: string,
  ) => {
    await manageMember({ eventId, teamId, userId });
    navigate(0);
  };

  const teams = leaderTeam?.teams ?? [];

  if (teams.length === 0) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardContent className="py-10">
            <Crown className="mx-auto mb-4 h-12 w-12 text-gray-400" />
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
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold">My Teams</h1>
        <p className="text-muted-foreground">
          Manage the teams you lead and view your members.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-xl"
          >
            <div className="h-2 bg-linear-to-r from-blue-600 to-indigo-600" />

            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{team.team_name}</CardTitle>
                  <CardDescription>Team ID: #{team.id}</CardDescription>
                  <CardDescription>Event Name: {team.title}</CardDescription>
                  <img
                    src={team.image_url}
                    width={100}
                    height={100}
                    alt="event image"
                    className="mt-2"
                  />
                </div>

                <Badge className="gap-1">
                  <Crown className="h-3 w-3" />
                  Leader
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Members</span>
                </div>
                <div className=" flex gap-3 items-center">
                  <Badge variant="secondary" className=" text-lg">
                    {team.members.length}
                  </Badge>

                  <Dialog>
                    <DialogTrigger>Add</DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                        <DialogDescription>
                          Enter the valid email to add to your team
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <Input
                          type="email"
                          placeholder="member@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button
                          onClick={() =>
                            handleAddMember(team.event_id, team.id)
                          }
                          className="w-full"
                        >
                          Add Member
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="font-semibold">Team Members</h3>

                {team.members.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No members have added yet.
                  </p>
                ) : (
                  team.members.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/40"
                    >
                      <div>
                        <p className="font-medium">{member.full_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.contact_number}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(member.joined_at).toLocaleDateString()}
                        <Button
                          size={"icon"}
                          onClick={() =>
                            handleRemove(team.event_id, team.id, member.user_id)
                          }
                        >
                          <Trash2 />{" "}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
