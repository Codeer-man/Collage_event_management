import { createBrowserRouter } from "react-router-dom";
import StudentLayout from "./layout/student/student.layout";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <StudentLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
]);
