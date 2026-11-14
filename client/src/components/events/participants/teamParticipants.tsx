import { Crown, Users } from "lucide-react";
import type { teamParticipants } from "../../../feature/event/type";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import ParticipantAvatar from "./avatar";

type Props = {
  teams: teamParticipants[];
};

export default function TeamParticipantsList({ teams }: Props) {
  if (teams.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-slate-500">
        No teams have registered yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {teams.map((team, index) => (
        <Card key={`${team.teamName}-${index}`} className="shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base font-semibold">
                {team.teamName}
              </CardTitle>

              <Badge variant="secondary">{team.member.length} Members</Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Crown size={15} className="text-amber-500" />
              Team Leader: {team.leader}
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Users size={14} />
              Team Members
            </div>

            <div className="space-y-3">
              {team.member.map((member, memberIndex) => (
                <div
                  key={`${member.email}-${memberIndex}`}
                  className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                >
                  <ParticipantAvatar
                    name={member.full_name}
                    image={member.image_url}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {member.full_name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {member.email}
                    </p>
                  </div>

                  {member.full_name === team.leader && (
                    <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                      Leader
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
