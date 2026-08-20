import { useEffect, useState } from "react";
import type { joinEventType, myEventType } from "./type";
import { cancelEvent, CreateEvent, getAllEvents, getYourEvents } from "./api";
import type { CreateEventFormData } from "../../components/student/event/createEvent";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function UseStudent() {
  const [events, setEvents] = useState<joinEventType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [muEvents, setMyEvents] = useState<myEventType[]>();

  const navigate = useNavigate();

  async function getEvents() {
    try {
      setLoading(true);
      const response = await getAllEvents();

      setEvents(response.events);
    } finally {
      setLoading(false);
    }
  }

  async function submitEvent(data: CreateEventFormData) {
    try {
      setSaving(true);

      const response = CreateEvent(data);

      toast.promise(response, {
        loading: "Creating event...",
        success: () => {
          getEvents();
          return "Event has been created successfully";
        },
        error: (error: unknown) => {
          return error instanceof Error
            ? error.message
            : "Something went wrong";
        },
      });

      await response;
    } finally {
      setSaving(false);
    }
  }

  async function yourEvents() {
    try {
      setLoading(true);

      const response = await getYourEvents();

      setMyEvents(response.myEvent);
    } finally {
      setLoading(false);
    }
  }

  async function cancelYourEvent(id: string) {
    const response = cancelEvent(id);

    toast.promise(response, {
      loading: "Canceling the event...",
      success: () => {
        navigate(0);
        return "Your event has been cancled";
      },
      error: "something went wrong",
    });
  }

  useEffect(() => {
    yourEvents();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  return {
    events,
    loading,
    //create event
    submitEvent,
    saving,
    //my event
    muEvents,
    cancelYourEvent,
  };
}
