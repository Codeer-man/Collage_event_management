import type { LucideIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import ThemeToggleButton from "../theme/theme-toggle-button";

export type AppNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type AppSidebarProps = {
  items: AppNavItem[];
  title: string;
  mobile?: boolean;
};

function Brand({ title }: { title: string }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3 rounded-xl">
      <span className="brand-mark">C</span>
      <span className="min-w-0">
        <span className="block text-base font-semibold tracking-tight text-foreground">
          CEMS
        </span>
        <span className="block truncate text-[11px] text-muted-foreground">
          {title}
        </span>
      </span>
    </Link>
  );
}

function Navigation({
  items,
  onNavigate,
}: {
  items: AppNavItem[];
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => (
        <NavLink
          to={href}
          key={href}
          end={
            href === "/student" ||
            href === "/admin" ||
            href === "/administrative"
          }
          onClick={onNavigate}
          className="app-nav-link"
        >
          <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default function AppSidebar({
  items,
  title,
  mobile = false,
}: AppSidebarProps) {
  if (mobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Open navigation"
            className="h-10 w-10 shrink-0 rounded-xl border-border bg-card lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[min(86vw,320px)] border-sidebar-border bg-sidebar p-0"
        >
          <SheetHeader className="border-b border-sidebar-border px-5 py-5 text-left">
            <SheetTitle>
              <Brand title={title} />
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100%-82px)] flex-col px-3 py-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </p>
            <Navigation items={items} />
            <div className="mt-auto flex items-center justify-between border-t border-sidebar-border px-3 pt-4">
              <span className="text-xs text-muted-foreground">Appearance</span>
              <ThemeToggleButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="app-sidebar hidden flex-col lg:flex">
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-sidebar-border px-5">
        <Brand title={title} />
        <ThemeToggleButton />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-6">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Workspace
        </p>
        <Navigation items={items} />
      </div>
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs font-medium text-sidebar-foreground">
          College Event Management
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Connect. Participate. Create.
        </p>
      </div>
    </aside>
  );
}
