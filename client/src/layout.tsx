import { createBrowserRouter } from "react-router-dom";
import StudentLayout from "./layout/student/student.layout";
import AdministrativeLayout from "./layout/administrative/administrative.layout";
import RoleGuard from "./components/auth/roleGuard";
import ProtectedLayout from "./components/auth/protectedLayout";
import AdministrativeDashboard from "./page/administrative/dashboard";
import HomeLayout from "./layout/home/home.layout";
import Faculty from "./page/administrative/faculty";

export const route = createBrowserRouter([
  // public or home
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <></>,
      },
    ],
  },
  // administrative
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuard allow={["administrative"]} />,
        children: [
          {
            path: "/administrative",
            element: <AdministrativeLayout />,
            children: [
              {
                index: true,
                element: <AdministrativeDashboard />,
              },
              {
                path: "faculty",
                element: <Faculty />,
              },
            ],
          },
        ],
      },
    ],
  },
  //admin
  {},
  //student
  {},
  {
    path: "*",
    element: <div>page does not exists </div>,
  },
]);
