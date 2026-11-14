import { Bell, CalendarDays, ChevronRight, Home } from "lucide-react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

import { useNotiStore } from "../../feature/notification/store";
import { useAuthStore } from "../../store/auth.store";

import { useEffect } from "react";
import { toast } from "sonner";

import Profile from "../../components/common/profileIcons";
import CommonLoader from "../../components/common/loader";
import EventSidebar from "../../components/events/sidebar";

export default function EventLayout() {
  const { getNoti, unreadMsgSignal } = useNotiStore();

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { eventId } = useParams();
  // Authentication
  useEffect(() => {
    if (user) return;

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
      toast.warning("Please log in to continue.");
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  // Notifications
  useEffect(() => {
    if (user) {
      void getNoti();
    }
  }, [getNoti, user]);

  const unreadCount = unreadMsgSignal();

  if (!user) return <CommonLoader />;

  return (
    <div className="app-shell flex min-h-screen">
      {/* Sidebar */}
      <EventSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Navbar */}
        <header className="app-topbar">
          <EventSidebar mobile />

          {/* Breadcrumb / Page identity */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
              <CalendarDays className="size-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Home className="size-4 text-muted-foreground" />
                <ChevronRight className="size-3 text-muted-foreground" />
                <span className="truncate">Events</span>
                <ChevronRight className="size-3 text-muted-foreground" />
                <span className="truncate">Manage Event</span>
              </div>

              <p className="hidden text-xs text-muted-foreground sm:block">
                Manage your event and participants.
              </p>
            </div>
          </div>
          {/* Right actions */}
          <div className="ml-auto flex items-center gap-3">
            <NavLink
              to={`/events/${eventId}/noti`}
              aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
              className="relative flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="size-5" />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </NavLink>

            <Profile role={user.role} image={user.image_url} />
          </div>
        </header>

        {/* Nested pages */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
