import { Home, Info } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

import Login from "../../page/auth/login";
import SignUp from "../../page/auth/register";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profileIcons";
import { ThemeToggleButton } from "../ui/skiper-ui/skiper26";
import { Button } from "../ui/button";

export default function DesktopNavBar() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            C
          </div>

          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight">CEMS</span>

            <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              College Events
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden items-center gap-1 lg:flex">
          {/* <NavTextLink  href="/" label="Home" icon={Home} /> */}
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
        </nav>

        {/* Right side */}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ThemeToggleButton />

          <div className="mx-1 h-7 w-px bg-border" />

          {user ? (
            <Profile image={user.image_url} role={user.role} />
          ) : (
            <div className="flex items-center gap-2">
              <Login />
              <SignUp />
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="ml-auto lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
