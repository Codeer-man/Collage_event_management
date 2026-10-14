import { createBrowserRouter } from "react-router-dom";
import StudentLayout from "./layout/student/student.layout";
import AdministrativeLayout from "./layout/administrative/administrative.layout";
import RoleGuard from "./components/auth/roleGuard";
import ProtectedLayout from "./components/auth/protectedLayout";
import HomeLayout from "./layout/home/home.layout";
import Faculty from "./page/administrative/faculty";
import AdminLayout from "./layout/admin/admin.layout";
import Students from "./page/admin/students";
import ApproveStudents from "./page/admin/approveSts";
import Event from "./page/admin/event";
import MyProfile from "./page/student/student";
import StudentDashboard from "./page/student/dashboard";
import Events from "./page/student/event";
import Team from "./page/student/team";
import HomePage from "./page/home/home";
import CreateEventPage from "./page/student/createEvent";
import MyEvents from "./page/student/myEvent";
import LeaderTeam from "./page/student/leaderTeam";
import EventRegistered from "./page/student/eventRegistered";
import EventList from "./page/admin/event-list";
import ForgetPassword from "./page/auth/forget-password";
import Location from "./page/administrative/location";

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
      {
        path: "/forget-password/:token",
        element: <ForgetPassword />,
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
              {
                path: "location",
                element: <Location />,
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
              {
                path: "list",
                element: <EventList />,
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
                element: <StudentDashboard />,
              },
              {
                path: "profile",
                element: <MyProfile />,
              },
              {
                path: "join/events",
                element: <Events />,
              },
              {
                path: "leader",
                element: <LeaderTeam />,
              },
              {
                path: "team",
                element: <Team />,
              },
              {
                path: "create/events",
                element: <CreateEventPage />,
              },
              {
                path: "my/events",
                element: <MyEvents />,
              },
              {
                path: "registered",
                element: <EventRegistered />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <div className="brand-mark">C</div>
        <h1 className="mt-5 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for may have moved or does not exist.
        </p>
        <a
          className="mt-5 text-sm font-medium text-primary hover:underline"
          href="/"
        >
          Return home
        </a>
      </div>
    ),
  },
]);
