import {
  Group,
  Home,
  Info,
  LogOut,
  Menu,
  Settings,
  SportShoeIcon,
  User,
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
import { ThemeToggleButton } from "../ui/skiper-ui/skiper26";

export default function MobileNavbar() {
  const { user } = useAuthStore();
  const { logout } = useAuthForm();

  function roleNav() {
    switch (user?.role) {
      case "administrative":
        return "/administrative";

      case "admin":
        return "/admin";

      case "student":
        return "/student";

      case "organizer":
        return "/organizer";

      default:
        return "/";
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[320px] flex-col p-0 sm:w-95"
      >
        {/* Header */}
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle asChild>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                C
              </div>

              <div className="flex flex-col text-left">
                <span className="font-semibold">CEMS</span>

                <span className="text-xs text-muted-foreground">
                  College Event Management System
                </span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* User section */}
        {user && (
          <>
            <div className="flex items-center gap-3 px-6 py-5">
              <img
                src={user.image_url}
                alt={user.full_name}
                className="h-11 w-11 rounded-full border object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user.full_name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <ThemeToggleButton />
            </div>

            <Separator />
          </>
        )}

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
          <Button
            className=" bg-primary/10 text-primary  inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium  transition hover:bg-primary/5 hover:text-foreground"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            <Home /> Home
          </Button>
          <Button
            className=" bg-primary/10 text-primary  inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium  transition hover:bg-primary/5 hover:text-foreground"
            onClick={() => {
              const element = document.getElementById("about");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </Button>

          {user && (
            <>
              <Separator className="my-4" />

              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </p>

              <MobileNavLink
                to={roleNav()}
                label="Dashboard"
                icon={<Settings />}
              />

              <MobileNavLink
                to="/student/join/events"
                label="Events"
                icon={<SportShoeIcon />}
              />

              <MobileNavLink
                to="/student/team"
                label="Teams"
                icon={<Group />}
              />
            </>
          )}
        </nav>

        {/* Bottom */}
        <div className="border-t p-4">
          {user ? (
            <Button
              variant="outline"
              className="w-full rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
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

function MobileNavLink({
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
        `
        flex items-center gap-3 rounded-xl px-3 py-3
        text-sm font-medium
        transition-all
        ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
        `
      }
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/70">
        {icon}
      </span>

      {label}
    </NavLink>
  );
}
