import { Building2 } from "lucide-react";
import AppSidebar from "../common/app-sidebar";
import type { AppNavItem } from "../common/app-sidebar";

const items: AppNavItem[] = [
  { label: "Faculty management", href: "/administrative", icon: Building2 },
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
