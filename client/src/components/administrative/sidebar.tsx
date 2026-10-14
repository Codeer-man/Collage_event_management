import { Building2, MapPinned } from "lucide-react";
import AppSidebar from "../common/app-sidebar";
import type { AppNavItem } from "../common/app-sidebar";

const items: AppNavItem[] = [
  { label: "Faculty management", href: "/administrative", icon: Building2 },
  {
    label: "location management",
    href: "/administrative/location",
    icon: MapPinned,
  },
];

export default function AdministrativeSideBar({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <AppSidebar items={items} title="College administration" mobile={mobile} />
  );
}
