import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { toast } from "sonner";
import Profile from "../../components/common/profileIcons";
import CommonLoader from "../../components/common/loader";
import AdminSidebar from "../../components/admin/sidebar";
import { useAuthStore } from "../../store/auth.store";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage =
    location.pathname === "/admin/approve"
      ? "Approve students"
      : location.pathname === "/admin/event"
        ? "Event approval"
        : location.pathname === "/admin/list"
          ? "Event directory"
          : "Students";
  const currentDescription =
    location.pathname === "/admin/approve"
      ? "Review student access requests."
      : location.pathname === "/admin/event"
        ? "Review events submitted for approval."
        : location.pathname === "/admin/list"
          ? "Browse events in CEMS."
          : "Manage student accounts for your faculty.";

  useEffect(() => {
    if (user) return;
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
      toast.warning("Please log in to continue.");
    }, 3000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user) return <CommonLoader />;

  return (
    <div className="app-shell flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="app-topbar">
          <AdminSidebar mobile />
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{currentPage}</p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                {currentDescription}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <Profile role={user.role} image={user.image_url} />
          </div>
        </header>
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
