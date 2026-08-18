import { createBrowserRouter } from "react-router-dom";
import StudentLayout from "./layout/student/student.layout";
import AdministrativeLayout from "./layout/administrative/administrative.layout";
import RoleGuard from "./components/auth/roleGuard";
import ProtectedLayout from "./components/auth/protectedLayout";
import AdministrativeDashboard from "./page/administrative/dashboard";
import HomeLayout from "./layout/home/home.layout";
import Faculty from "./page/administrative/faculty";
import AdminLayout from "./layout/admin/admin.layout";
import Students from "./page/admin/students";
import ApproveStudents from "./page/admin/approveSts";
import Event from "./page/admin/event";
import MyProfile from "./page/student/student";
import Events from "./page/student/event";
import Team from "./page/student/team";
import CreateEvent from "./page/student/createEvent";
import HomePage from "./page/home/home";

export const route = createBrowserRouter([
  // public or home
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
              // {
              //   index: true,
              //   element: <AdministrativeDashboard />,
              // },
              {
                // path: "faculty",
                index: true,
                element: <Faculty />,
              },
            ],
          },
        ],
      },
    ],
  },
  //admin
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuard allow={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Students />,
              },
              {
                path: "approve",
                element: <ApproveStudents />,
              },
              {
                path: "event",
                element: <Event />,
              },
            ],
          },
        ],
      },
    ],
  },
  //student
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuard allow={["student"]} />,
        children: [
          {
            path: "/student",
            element: <StudentLayout />,
            children: [
              {
                index: true,
                element: <MyProfile />,
              },
              {
                path: "join/events",
                element: <Events />,
              },
              {
                path: "team",
                element: <Team />,
              },
              {
                path: "create/events",
                element: <CreateEvent />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>page does not exists </div>,
  },
]);
