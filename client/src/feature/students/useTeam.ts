import { create } from "zustand";
import { toast } from "sonner";
import {
  addMember,
  createTeam,
  getUsers,
  getYourTeam,
  removeMember,
} from "./api";
import type { participateUser, TeamResp } from "./type";

type TeamState = {
  leaderTeam: TeamResp | null;
  users: participateUser[];

  getTeam: () => Promise<void>;
  handleCreateteam: (eventId: number, teamName: string) => Promise<boolean>;
  handleAddMember: (
    eventId: string,
    teamId: string,
    member_id: string,
  ) => Promise<void>;
  handleRemoveMember: (
    eventId: string,
    teamId: string,
    member_id: string,
  ) => Promise<void>;
  getUserForTeam: (fullName: string) => Promise<void>;
};

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

export const useTeamStore = create<TeamState>()((set, get) => ({
  leaderTeam: null,
  users: [],

  getTeam: async () => {
    try {
      const resp = await getYourTeam();
      set({ leaderTeam: resp });
    } catch (error) {
      toast.error(errorMessage(error));
    }
  },

  handleCreateteam: async (eventId, teamName) => {
    try {
      const response = await createTeam(eventId, teamName);
      if (response) {
        toast.success("You have successfully created a team for this event");
      }
      return true;
    } catch (error) {
      toast.error(errorMessage(error));
      return false;
    }
  },

  handleAddMember: async (eventId, teamId, member_id) => {
    try {
      await addMember({ eventId, teamId, member_id });
      toast.success("Invitation has been sent to the user");
    } catch (error) {
      toast.error(errorMessage(error));
    }
  },

  handleRemoveMember: async (eventId, teamId, member_id) => {
    try {
      await removeMember({ eventId, teamId, member_id });
      toast.success("User has been removed successfully");
      await get().getTeam();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  },

  getUserForTeam: async (fullName) => {
    const response = getUsers(fullName);

    toast.promise(response, {
      loading: "Searching user......",
      success: (data) => {
        set({ users: data.users });
        return "Found Users";
      },
      error: errorMessage,
    });
  },
}));
