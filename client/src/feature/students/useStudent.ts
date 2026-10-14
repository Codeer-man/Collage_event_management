import { useEffect, useState } from "react";
import type {
  CreateEventFormData,
  joinEventType,
  location,
  myEventType,
} from "./type";
import {
  cancelEvent,
  CreateEvent,
  getAllEvents,
  getYourEvents,
  loadLocationSts,
} from "./api";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function UseStudent() {
  const [events, setEvents] = useState<joinEventType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [muEvents, setMyEvents] = useState<myEventType[]>();
  const [location, setLocation] = useState<location[]>([]);

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
      navigate("/student/my/events");
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
    getEvents();
  }

  async function loadLocation() {
    const respones = await loadLocationSts();

    setLocation(respones.location);
  }

  useEffect(() => {
    yourEvents();
  }, []);
  useEffect(() => {
    loadLocation();
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
    location,
    cancelYourEvent,
  };
}
