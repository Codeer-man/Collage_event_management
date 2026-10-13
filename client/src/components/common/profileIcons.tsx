import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAuthForm from "../../feature/auth/use-auth-form";
import { useAuthStore } from "../../store/auth.store";

function dashboardRoute(role: string) {
  if (role === "administrative") return "/administrative";
  if (role === "admin") return "/admin";
  if (role === "organizer") return "/organizer";
  return "/student";
}

export default function Profile({
  image,
  role,
}: {
  image: string;
  role: string;
}) {
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuthForm();
  const initials =
    user?.full_name
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "C";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 gap-2 rounded-xl px-1.5 sm:px-2"
          aria-label="Open account menu"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage
              src={image || undefined}
              alt={user?.full_name || "Profile"}
            />
            <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden max-w-32 text-left sm:block">
            <span className="block truncate text-xs font-semibold">
              {user?.full_name || "Account"}
            </span>
            <span className="mt-0.5 block text-[10px] capitalize text-muted-foreground">
              {role}
            </span>
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5">
        <div className="px-2.5 py-2">
          <p className="truncate text-sm font-medium">
            {user?.full_name || "CEMS account"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email || ""}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to={dashboardRoute(role)}
            className="flex w-full cursor-pointer items-center gap-2"
          >
            <UserRound className="h-4 w-4" /> Workspace
          </Link>
        </DropdownMenuItem>
        {role === "student" && (
          <DropdownMenuItem asChild>
            <Link
              to="/student/profile"
              className="flex w-full cursor-pointer items-center gap-2"
            >
              <UserRound className="h-4 w-4" /> My profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/" className="w-full cursor-pointer">
            Home page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
