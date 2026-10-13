import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";
import CommonLoader from "../../components/common/loader";
import Profile from "../../components/common/profileIcons";
import StudentSidebar from "../../components/student/sidebar";
import { useAuthStore } from "../../store/auth.store";

export default function StudentLayout() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

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
      <StudentSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="app-topbar">
          <StudentSidebar mobile />
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Welcome back, {user.full_name?.split(" ")[0] || "Student"}</p>
              <p className="hidden text-xs text-muted-foreground sm:block">Find your next campus experience.</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Profile role={user.role} image={user.image_url} />
          </div>
        </header>
        <main className="min-w-0 flex-1"><Outlet /></main>
      </div>
    </div>
  );
}
