import { ArrowDown, CalendarDays, Home, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import Login from "../../page/auth/login";
import SignUp from "../../page/auth/register";
import MobileNavbar from "./mobile-navbar";
import Profile from "./profileIcons";
import ThemeToggleButton from "../theme/theme-toggle-button";

export default function DesktopNavBar() {
  const { user } = useAuthStore();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card shadow-[0_4px_18px_rgba(23,42,51,0.06)]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-4 sm:px-6 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <span className="brand-mark transition-transform group-hover:-rotate-3">
            <CalendarDays className="size-5" strokeWidth={2.2} />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-semibold tracking-tight">
              CEMS
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Campus, together
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-10 hidden items-center gap-2 md:flex"
        >
          <Link
            to="/"
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <button
            type="button"
            onClick={() => scrollTo("features")}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Info className="h-4 w-4" /> Features
          </button>
          <button
            type="button"
            onClick={() => scrollTo("about")}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            How it works <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("faq")}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Info className="h-4 w-4" /> FAQ
          </button>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggleButton />
          <span className="mx-1 h-6 w-px bg-border" />
          {user ? (
            <Profile image={user.image_url} role={user.role} />
          ) : (
            <>
              <Login />
              <SignUp />
            </>
          )}
        </div>
        <div className="ml-auto md:hidden">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
