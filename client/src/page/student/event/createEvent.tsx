import CreateEvent from "../../../components/student/event/createEvent";
import useAuthForm from "../../../feature/auth/use-auth-form";
import { UseStudent } from "../../../feature/students/useStudent";

export default function CreateEventPage() {
  const { saving, submitEvent, location } = UseStudent();
  const { faculty } = useAuthForm();

  if (!faculty) {
    return <div>Hello world</div>;
  }

  return (
    <div>
      <CreateEvent
        location={location}
        faculties={faculty}
        onSubmit={submitEvent}
        loading={saving}
      />
    </div>
  );
}
