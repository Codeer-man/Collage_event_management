import { toast } from "sonner";
import { createTeam, getUsers, getYourTeam, manageMember } from "./api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { participateUser, TeamResp } from "./type";

export function useTeamHandler() {
  const [leaderTeam, setLeaderTeam] = useState<TeamResp | null>(null);
  const [users, setUser] = useState<participateUser[]>();
  const navigate = useNavigate();

  async function handleCreateteam(eventId: number, teamName: string) {
    try {
      const response = await createTeam(eventId, teamName);

      if (response) {
        toast.success("You have successfuly create a team for this event");
      }

      navigate("/student/leader");
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "something went wrong";
      toast.error(msg);
    }
  }

  const handleAddMember = async (
    eventId: string,
    teamId: string,
    member_id: string,
  ) => {
    try {
      await manageMember({ eventId, teamId, member_id });
      toast.success("Add successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  async function getUserForTeam(fullName: string) {
    const response = getUsers(fullName);

    toast.promise(response, {
      loading: "Searching user......",
      success: (user) => {
        setUser(user.users);
        return "Found Users";
      },
      error: (error: unknown) => {
        return error instanceof Error ? error.message : "Something went wrong";
      },
    });
  }

  async function getTeam() {
    const resp = await getYourTeam();
    setLeaderTeam(resp);
  }

  useEffect(() => {
    getTeam();
  }, []);

  return {
    getUserForTeam,
    users,
    handleCreateteam,
    leaderTeam,
    handleAddMember,
    getTeam,
  };
}
