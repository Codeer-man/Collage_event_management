import { Folder, ShoppingBag, type LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "../theme/toggle-theme";
import { ThemeToggleButton } from "../ui/skiper-ui/skiper26";

type administrativeNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const items: administrativeNavItem[] = [
  // { label: "Dashboard", href: "/administrative", icon: LayoutDashboard },
  { label: "Faculty", href: "/administrative", icon: Folder },
];

const navItemBase =
  "flex h-12 items-center gap-3 px-4 text-[18px] font-medium transition-colors rounded-md mx-2";

const activeItem = "bg-sidebar-primary text-sidebar-primary-foreground";
const idleItem =
  "text-sidebar-foreground hover:bg-sidebar-ring hover:text-sidebar-accent-foreground";

export default function AdministrativeSideBar() {
  function SideBarList() {
    return (
      <nav className="space-y-1 py-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.href}
              key={item.label}
              end={item.href === "/administrative"}
              className={({ isActive }) =>
                `${navItemBase} ${isActive ? activeItem : idleItem}`
              }
            >
              {/* Changed h-4.5/w-4.5 to valid standard Tailwind h-5 w-5 sizes */}
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <aside className="w-75 shrink-0 h-screen sticky top-0 border-r border-sidebar-border bg-sidebar flex flex-col  ">
      <div className="flex h-20 items-center border-b border-sidebar-border px-5 shrink-0">
        <div className="flex items-center gap-5 flex-1">
          <ShoppingBag className="h-10 w-10" />
          <span className="font-semibold text-foreground text-[22px]">
            CEMS
          </span>
        </div>
        <div className="gap-3 flex">
          <ThemeToggle />
          <ThemeToggleButton />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SideBarList />
      </div>
    </aside>
  );
}
