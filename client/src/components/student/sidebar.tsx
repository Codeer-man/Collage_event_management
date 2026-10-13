import {
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Crown,
  LayoutDashboard,
  UserRound,
  Users,
} from "lucide-react";
import AppSidebar from "../common/app-sidebar";
import type { AppNavItem } from "../common/app-sidebar";

const items: AppNavItem[] = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "My Profile", href: "/student/profile", icon: UserRound },
  { label: "Explore events", href: "/student/join/events", icon: CalendarDays },
  { label: "My teams", href: "/student/team", icon: Users },
  { label: "Team leadership", href: "/student/leader", icon: Crown },
  { label: "Create event", href: "/student/create/events", icon: CalendarPlus },
  { label: "Events I manage", href: "/student/my/events", icon: CalendarCheck },
  {
    label: "My registrations",
    href: "/student/registered",
    icon: ClipboardCheck,
  },
];

export default function StudentSidebar({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return <AppSidebar items={items} title="Student workspace" mobile={mobile} />;
}
