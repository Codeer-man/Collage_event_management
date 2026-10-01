import EventPresentList from "../../components/student/event/listEvent";
import { UseStudent } from "../../feature/students/useStudent";

export default function Events() {
  const { events, loading } = UseStudent();

  return (
    <div className="mx-5 mt-5">
      <EventPresentList events={events} loading={loading} />
    </div>
  );
}
