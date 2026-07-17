import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/toggle-theme";
import { TestTube, UserIcon, LogOutIcon, type LucideIcon } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Login from "../../page/auth/login";
import SignUp from "../../page/auth/register";
import useAuthForm from "../../feature/auth/use-auth-form";

function NavTextLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link to={href} className={textLink}>
      <Icon className="h-4.5 w-4.5" />
      <span>{label}</span>
    </Link>
  );
}

const textLink =
  "inline-flex h-10 items-center gap-2 rounded-xl px-3 text-[15px] font-medium text-foreground/90 transition hover:bg-primary/5 hover:text-foreground";

export default function DesktopNavBar() {
  const { user } = useAuthStore();
  const { logout } = useAuthForm();

  return (
    <div className="sticky top-0 z-50 border-b border-border/70 bg-secondary/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl h-18 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="font-semibold text-lg mr-4">
          <span>Title and logo</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:block ml-2 flex-1">
          <NavTextLink href="test" label="test" icon={TestTube} />
        </div>

        {/* Global Utilities */}
        <ThemeToggle />

        {/* Conditional Auth UI */}
        {user ? (
          /* AUTHENTICATED: Show Account Dropdown Menu */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full gap-2 ">
                <img src={user.image_url} alt="Profile pic" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/administrative" className="w-full cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="w-full cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="w-full cursor-pointer">
                  Setting
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          /* UNAUTHENTICATED: Show Inline Buttons triggering Modals */
          <div className="flex items-center gap-2">
            <Login />

            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
}
