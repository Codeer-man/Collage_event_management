import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { getParticipants } from "../../../feature/students/api";

type Participant = {
  user_id: string;
  name: string;
  image: string | null;
};

type TeamParticipant = {
  event_id: string;
  event_title: string;
  registration_id: string;
  team_id: string;
  team_name: string;
  members: Participant[];
};

export type ParticipantResponse = {
  team: TeamParticipant[];
  solo: Participant[];
};

type EventDetailProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  event: string | null;
};

export default function EventsDetail({
  event,
  onOpenChange,
  open,
}: EventDetailProps) {
  const [participate, setParticipate] = useState<ParticipantResponse | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!event || !open) {
      return;
    }

    async function fetchParticipants() {
      try {
        setLoading(true);

        const response = await getParticipants(event!);

        setParticipate(response);
      } catch (error) {
        console.error("Failed to get participants:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, [event, open]);
  console.log(participate, "par");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {participate?.team[0]?.event_title ?? "Event Participants"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <p>Loading participants...</p>
        ) : !participate ||
          (participate.team.length === 0 && participate.solo.length === 0) ? (
          <div className="flex min-h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No participants found
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Teams */}
            {participate.team.length > 0 &&
              participate.team.map((team) => (
                <div key={team.team_id} className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{team.team_name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {team.members.length} members
                    </p>
                  </div>

                  <div className="space-y-2">
                    {team.members.map((member) => (
                      <div
                        key={member.user_id}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <img
                          src={member.image || "/default-avatar.png"}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />

                        <p className="font-medium">{member.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Solo participants */}
            {participate.solo.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Solo Participants</h3>

                <div className="space-y-2">
                  {participate.solo.map((member) => (
                    <div
                      key={member.user_id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <img
                        src={member.image || "/default-avatar.png"}
                        alt={member.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <p className="font-medium">{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
