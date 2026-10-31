import { Crown, Trash2, UserRound } from "lucide-react";
import { Button } from "../../ui/button";
import type { TeamMember } from "../../../feature/students/type";
import { useTeamStore } from "../../../feature/students/useTeam";

type TeamMembersListProps = {
  members: TeamMember[];
  leaderId?: string;
  canManage?: boolean;
  emptyMessage?: string;
  eventId: string;
  teamId: string;
};

export default function TeamMembersList({
  members,
  leaderId,
  canManage,
  emptyMessage = "No team members yet.",
  eventId,
  teamId,
}: TeamMembersListProps) {
  const handleRemoveMember = useTeamStore((s) => s.handleRemoveMember);

  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <UserRound className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="divide-y rounded-lg border">
      {members.map((member) => {
        const isLeader = member.user_id === leaderId;

        return (
          <div key={member.user_id} className="flex items-center gap-3 p-3">
            {member.image_url ? (
              <img
                src={member.image_url}
                alt={member.full_name}
                className="h-10 w-10 shrink-0 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserRound className="h-5 w-5 text-muted-foreground" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="truncate text-sm font-medium">
                  {member.full_name}
                </p>

                {isLeader && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                    <Crown className="h-3 w-3" />
                    Leader
                  </span>
                )}
              </div>

              <p className="truncate text-xs text-muted-foreground">
                {member.email}
              </p>

              {member.joined_at && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Joined {new Date(member.joined_at).toLocaleDateString()}
                </p>
              )}
            </div>

            {canManage && !isLeader && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${member.full_name}`}
                onClick={() =>
                  handleRemoveMember(eventId, teamId, member.user_id)
                }
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
