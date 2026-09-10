import { toast } from "sonner";
import { createTeam, getYourTeam } from "./api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TeamResp } from "./type";

export function useTeamHandler() {
  const [leaderTeam, setLeaderTeam] = useState<TeamResp | null>(null);
  const navigate = useNavigate();

  async function handleCreateteam(eventId: number, teamName: string) {
    try {
      toast.promise(createTeam(eventId, teamName), {
        loading: "Creating Team...",
        success: "Team created successfully",
        error: "Something went wrong",
      });

      navigate("/student/team");
    } catch (error) {
      console.error(error);
    }
  }

  async function getTeam() {
    const resp = await getYourTeam();
    setLeaderTeam(resp);
  }
  useEffect(() => {
    getTeam();
  }, []);
  return { handleCreateteam, leaderTeam };
}
