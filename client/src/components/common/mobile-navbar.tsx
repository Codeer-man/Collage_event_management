import { LogOutIcon, Menu, Store, User } from "lucide-react";
import { Link } from "react-router-dom";

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

  function roleNav(): string {
    if (user?.role === "administrative") {
      return "/administrative";
    }
    if (user?.role === "admin") {
      return "/admin";
    }
    if (user?.role === "student") {
      return "/student";
    }
    if (user?.role === "organizer") {
      return "/organizer";
    }

    // Fallback route for guests or fallback roles
    return "/";
  }

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex w-[320px] flex-col p-0">
          {/* Header */}
          <SheetHeader className="border-b p-6  ">
            <SheetTitle asChild>
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Store className="h-6 w-6" />
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-semibold text-lg">CEMS</span>
                  <span className="text-xs text-muted-foreground">
                    Event Management
                  </span>
                </div>
              </Link>
            </SheetTitle>
          </SheetHeader>

          {/* User */}
          {user && (
            <>
              <div className="flex items-center gap-3 p-6">
                <img
                  src={user.image_url}
                  alt={user.full_name}
                  className="h-14 w-14 rounded-full border object-cover"
                />

                <div className="overflow-hidden flex-1">
                  <p className="truncate font-medium">{user.full_name}</p>

                  <p className="truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <ThemeToggleButton />
              </div>

              <Separator />
            </>
          )}

          {/* Navigation */}
          <nav className="flex flex-1 flex-col gap-2 p-4">
            <Link
              to="/"
              className="rounded-lg px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Home
            </Link>

            <Link
              to="#"
              className="rounded-lg px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Coming
            </Link>

            <Link
              to="#"
              className="rounded-lg px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              coming
            </Link>

            <Link
              to="#"
              className="rounded-lg px-4 py-3 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              cmoing
            </Link>

            {user && (
              <>
                <Separator className="my-2" />

                <Link
                  to={roleNav()}
                  className="rounded-lg px-4 py-3 transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-lg px-4 py-3 transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  to="/settings"
                  className="rounded-lg px-4 py-3 transition-colors hover:bg-accent"
                >
                  Settings
                </Link>
              </>
            )}
          </nav>

          {/* Bottom */}
          <div className="border-t p-4">
            {user ? (
              <Button variant="destructive" className="w-full" onClick={logout}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <Login />
                <SignUp />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
