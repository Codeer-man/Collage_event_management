import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/toggle-theme";
import { useAuthStore } from "../../store/auth.store";

import Login from "../../page/auth/login";
import SignUp from "../../page/auth/register";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profileIcons";
import { Home, type LucideIcon } from "lucide-react";

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

  return (
    <div className="sticky top-0 z-50 border-b border-border/70 bg-secondary/60 backdrop-blur-xl">
      <div className="mx-auto flex   max-w-7xl h-18 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to={"/"} className="font-semibold text-lg mr-4 flex-1">
          <span>Title and logo</span>
        </Link>
        <div className=" flex gap-5">
          {/* Navigation Links */}
          <div className=" lg:block hidden">
            <NavTextLink href="/" label="Home" icon={Home} />
          </div>

          {/* Theme changer */}
          <div className=" hidden lg:block ">
            <ThemeToggle />
          </div>

          <nav className=" hidden lg:block">
            {/* Conditional Auth UI */}
            {user ? (
              <Profile image={user.image_url} role={user.role} />
            ) : (
              /* UNAUTHENTICATED: Show Inline Buttons triggering Modals */
              <div className="flex items-center gap-2">
                <Login />

                <SignUp />
              </div>
            )}
          </nav>
        </div>

        <MobileNavbar />
      </div>
    </div>
  );
}
