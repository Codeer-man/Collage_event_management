import {
  Folder,
  Menu,
  ShoppingBag,
  Award,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { Button } from "../ui/button";
import { ThemeToggleButton } from "../ui/skiper-ui/skiper26";

type AdministrativeNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const items: AdministrativeNavItem[] = [
  {
    label: "Profile",
    href: "/student",
    icon: Folder,
  },
  {
    label: " Join Events",
    href: "/student/join/events",
    icon: Folder,
  },
  {
    label: "team",
    href: "/student/team",
    icon: Award,
  },
  {
    label: "My team",
    href: "/student/leader",
    icon: Award,
  },
  {
    label: "Create events",
    href: "/student/create/events",
    icon: Award,
  },
  {
    label: "My events",
    href: "/student/my/events",
    icon: Award,
  },
];

const navItemBase =
  "flex h-12 items-center gap-3 px-4 text-[18px] font-medium transition-colors rounded-md mx-2";

const activeItem = "bg-sidebar-primary text-sidebar-primary-foreground";

const idleItem =
  "text-sidebar-foreground hover:bg-sidebar-ring hover:text-sidebar-accent-foreground";

export default function StudentSidebar() {
  function SideBarList({ mobile = false }: { mobile?: boolean }) {
    return (
      <nav className="space-y-1 py-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.href}
              key={item.label}
              end={item.href === "/student"}
              className={({ isActive }) =>
                `${navItemBase} ${isActive ? activeItem : idleItem}`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <aside className="hidden lg:flex w-75 shrink-0 h-screen sticky top-0 border-r border-sidebar-border bg-sidebar flex-col">
        {/* Header */}
        <div className="flex h-20 items-center border-b border-sidebar-border px-5 shrink-0">
          <div className="flex items-center gap-5 flex-1">
            <ShoppingBag className="h-10 w-10" />

            <span className="font-semibold text-foreground text-[22px]">
              CEMS
            </span>
          </div>

          <ThemeToggleButton />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SideBarList />
        </div>
      </aside>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden">
        <Sheet>
          {/* Hamburger */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="m-3">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          {/* Mobile sidebar */}
          <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
            {/* Header */}
            <SheetHeader className="h-20 border-b border-sidebar-border px-5">
              <SheetTitle className="flex items-center gap-4">
                <ShoppingBag className="h-8 w-8" />

                <span className="font-semibold text-xl">CEMS</span>
              </SheetTitle>
            </SheetHeader>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
              <SideBarList mobile />
            </div>

            {/* Theme */}
            <div className="border-t border-sidebar-border p-4 flex justify-end">
              <ThemeToggleButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
