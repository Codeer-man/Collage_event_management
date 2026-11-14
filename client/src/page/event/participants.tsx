import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

import { useEventStore } from "../../feature/event/store";
import { Input } from "../../components/ui/input";
import ParticipantsHeader from "../../components/events/participants/header";
import TeamParticipantsList from "../../components/events/participants/teamParticipants";
import ParticipantTable from "../../components/events/participants/participantsTable";

export default function Participants() {
  const { eventId } = useParams();

  const [search, setSearch] = useState("");

  const {
    loading,
    soloParticipants,
    teamParticipants,
    teamEvent,
    getEventParticipants,
  } = useEventStore((state) => state);

  useEffect(() => {
    const id = Number(eventId);

    if (Number.isInteger(id) && id > 0) {
      void getEventParticipants(id);
    }
  }, [eventId, getEventParticipants]);

  const totalParticipants = teamEvent
    ? (teamParticipants?.reduce(
        (total, team) => total + team.member.length,
        0,
      ) ?? 0)
    : (soloParticipants?.length ?? 0);

  const filteredParticipants = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return soloParticipants ?? [];

    return (soloParticipants ?? []).filter((participant) =>
      [participant.full_name, participant.email, participant.faculty].some(
        (value) => value?.toLowerCase().includes(query),
      ),
    );
  }, [soloParticipants, search]);

  const filteredTeams = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return teamParticipants ?? [];

    return (teamParticipants ?? []).filter((team) => {
      const teamMatches = [team.teamName, team.leader].some((value) =>
        value?.toLowerCase().includes(query),
      );

      const memberMatches = team.member.some((member) =>
        [member.full_name, member.email, member.faculty].some((value) =>
          value?.toLowerCase().includes(query),
        ),
      );

      return teamMatches || memberMatches;
    });
  }, [teamParticipants, search]);

  if (loading || teamEvent === null) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-slate-500">Loading participants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <ParticipantsHeader
        totalParticipants={totalParticipants}
        totalTeams={teamParticipants?.length ?? 0}
        isTeamEvent={teamEvent}
      />

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold text-slate-800">
            {teamEvent ? "Registered Teams" : "Registered Participants"}
          </h2>
          <p className="text-sm text-slate-500">
            {teamEvent
              ? `${filteredTeams.length} teams found`
              : `${filteredParticipants.length} participants found`}
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            placeholder="Search participants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {teamEvent ? (
        <TeamParticipantsList teams={filteredTeams} />
      ) : (
        <ParticipantTable participants={filteredParticipants} />
      )}
    </div>
  );
}
