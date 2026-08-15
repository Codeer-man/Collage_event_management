import { useEffect, useState } from "react";
import type { event, Pagination, student, unApprovedSts } from "./types";
import {
  approveEvent,
  approveStudent,
  getAllsts,
  getAllUnApprovedSts,
  getPendingEvents,
} from "./api";
import { toast } from "sonner";

export default function useAdmin() {
  const [loading, setLoading] = useState(false);
  const [eventloading, setEventLoading] = useState(false);
  const [events, setEvents] = useState<event[] | []>([]);
  const [students, setStudents] = useState<student[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [unApproved, setUnapproved] = useState<unApprovedSts[]>([]);

  async function getAllStudents(page = 1, limit = 10, search = "") {
    try {
      setLoading(true);

      const response = await getAllsts(page, limit, search);

      setStudents(response.students);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch students:", error);

      setStudents([]);
    } finally {
      setLoading(false);
    }
  }

  //unapprove students list
  async function getUnapproved() {
    try {
      setLoading(true);
      const response = await getAllUnApprovedSts();

      setUnapproved(response.students);
    } catch (error) {
      console.error("Failed to fetch students:", error);

      setUnapproved([]);
    } finally {
      setLoading(false);
    }
  }

  //student status
  async function handleStudentStatus(userId: string, value: boolean) {
    try {
      setLoading(true);
      const response = approveStudent(userId, value);

      toast.promise(response, {
        loading: value ? "Accepting..." : "Declining...",
        success: () => {
          getUnapproved();
          return value
            ? "The use has been approved"
            : "THe user has been declined";
        },
        error: (error: unknown) => {
          return error instanceof Error
            ? error.message
            : "something went wrong";
        },
      });
    } finally {
      setLoading(false);
    }
  }

  //get all events
  async function getAllEvents() {
    try {
      setEventLoading(true);
      const response = await getPendingEvents();

      setEvents(response.events);
    } finally {
      setEventLoading(false);
    }
  }

  // event status
  async function handleEvents(status: boolean, eventId: string) {
    const response = approveEvent(status, eventId);
    toast.promise(response, {
      loading: status ? "Accepting..." : "Declining...",
      success: () => {
        getAllEvents();
        return status
          ? "The event has been approved"
          : "The event has been declined";
      },
      error: (error: unknown) => {
        return error instanceof Error ? error.message : "something went wrong";
      },
    });
  }

  useEffect(() => {
    getUnapproved();
  }, []);

  useEffect(() => {
    getAllEvents();
  }, []);

  return {
    getAllStudents,
    pagination,

    loading,
    students,
    //unapproved
    unApproved,
    handleStudentStatus,
    //event
    events,
    handleEvents,
    eventloading,
  };
}
