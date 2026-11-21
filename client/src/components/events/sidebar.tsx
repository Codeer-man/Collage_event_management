import { LayoutDashboard, Users, Newspaper } from "lucide-react";

import AppSidebar from "../common/app-sidebar";
import type { AppNavItem } from "../common/app-sidebar";
import { useParams } from "react-router-dom";

export default function EventSidebar({ mobile = false }: { mobile?: boolean }) {
  const { eventId } = useParams();

  const base = `/events/${eventId}`;

  const items: AppNavItem[] = [
    {
      label: "Overview",
      href: `${base}/manage`,
      icon: LayoutDashboard,
    },
    {
      label: "Participants",
      href: `${base}/participants`,
      icon: Users,
    },
    {
      label: "Event News",
      href: `${base}/news`,
      icon: Newspaper,
    },
  ];

  return <AppSidebar items={items} title="Event Management" mobile={mobile} />;
}
