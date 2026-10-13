import {
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Users,
} from "lucide-react";
import AppSidebar from "../common/app-sidebar";
import type { AppNavItem } from "../common/app-sidebar";

const items: AppNavItem[] = [
  { label: "Students", href: "/admin", icon: Users },
  { label: "Approve students", href: "/admin/approve", icon: ClipboardCheck },
  { label: "Create event", href: "/admin/event", icon: CalendarPlus },
  { label: "Event directory", href: "/admin/list", icon: CalendarDays },
];

export default function AdminSidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <AppSidebar items={items} title="Faculty administration" mobile={mobile} />
  );
}
