import React from "react";
import EventPresentList from "../../components/student/event/listEvent";
import EventDetail from "../../components/student/event/event-detail";
import { UseStudent } from "../../feature/students/useStudent";

export default function Events() {
  const { events, loading } = UseStudent();

  return (
    <div className="mx-5 mt-5">
      <EventPresentList events={events} loading={loading} />
      <EventDetail />
    </div>
  );
}
