import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import AdministrativeSideBar from "../../components/administrative/sidebar";
import Profile from "../../components/common/profileIcons";
import { useAuthStore } from "../../store/auth.store";
import CommonLoader from "../../components/common/loader";

export default function AdministrativeLayout() {
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
      <AdministrativeSideBar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="app-topbar">
          <AdministrativeSideBar mobile />
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground sm:flex">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">College administration</p>
              <p className="hidden text-xs text-muted-foreground sm:block">
                Manage faculties and faculty administrators.
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
