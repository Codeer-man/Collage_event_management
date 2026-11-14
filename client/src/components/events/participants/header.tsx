import { Users, UsersRound } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

type Props = {
  totalParticipants: number;
  totalTeams?: number;
  isTeamEvent: boolean;
};

export default function ParticipantsHeader({
  totalParticipants,
  totalTeams = 0,
  isTeamEvent,
}: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Participants
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage and view everyone registered for your event.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Participants</p>
              <h2 className="text-2xl font-bold text-slate-900">
                {totalParticipants}
              </h2>
            </div>
          </CardContent>
        </Card>

        {isTeamEvent && (
          <Card className="border-slate-200 shadow-none">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <UsersRound size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Teams</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {totalTeams}
                </h2>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
