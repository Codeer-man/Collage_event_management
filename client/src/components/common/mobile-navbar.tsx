import {
  CalendarDays,
  Home,
  Info,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAuthStore } from "../../store/auth.store";
import useAuthForm from "../../feature/auth/use-auth-form";
import Login from "../../page/auth/login";
import SignUp from "../../page/auth/register";
import ThemeToggleButton from "../theme/theme-toggle-button";

export default function MobileNavbar() {
  const { user } = useAuthStore();
  const { logout } = useAuthForm();
  const dashboardPath = user ? `/${user.role}` : "/";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          className="h-10 w-10 rounded-xl"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[min(88vw,360px)] flex-col p-0"
      >
        <SheetHeader className="border-b px-5 py-5 text-left">
          <SheetTitle asChild>
            <Link to="/" className="flex items-center gap-3">
              <span className="brand-mark">C</span>
              <span>
                <span className="block text-base font-semibold">CEMS</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  College Event Management
                </span>
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        {user && (
          <div className="flex items-center gap-3 px-5 py-4">
            <img
              src={user.image_url || undefined}
              alt=""
              className="h-10 w-10 rounded-full border border-border bg-muted object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user.full_name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
            <ThemeToggleButton />
          </div>
        )}
        {!user && (
          <div className="flex items-center justify-between px-5 py-3">
            <span className="text-xs text-muted-foreground">Appearance</span>
            <ThemeToggleButton />
          </div>
        )}
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
          <MobileLink to="/" label="Home" icon={<Home className="h-4 w-4" />} />
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Info className="h-4 w-4" /> About CEMS
          </button>
          {user && (
            <>
              <Separator className="my-3" />
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Your workspace
              </p>
              <MobileLink
                to={dashboardPath}
                label="Dashboard"
                icon={<Settings className="h-4 w-4" />}
              />
              {user.role === "student" && (
                <>
                  <MobileLink
                    to="/student/join/events"
                    label="Explore events"
                    icon={<CalendarDays className="h-4 w-4" />}
                  />
                  <MobileLink
                    to="/student/team"
                    label="Teams"
                    icon={<Users className="h-4 w-4" />}
                  />
                </>
              )}
            </>
          )}
        </nav>
        <div className="border-t p-4">
          {user ? (
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Login />
              <SignUp />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/70">
        {icon}
      </span>
      {label}
    </NavLink>
  );
}
