import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Profile from "../../components/common/profileIcons";
import { useAuthStore } from "../../store/auth.store";
import CommonLoader from "../../components/common/loader";
import { toast } from "sonner";
import AdminSidebar from "../../components/admin/sidebar";
import { Button } from "../../components/ui/button";
import { Bell, GraduationCap } from "lucide-react";

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
      toast.warning("Please login ");
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  if (!user) {
    return <CommonLoader />;
  }

  return (
    <div className=" min-h-screen bg-secondary/40">
      <div className=" flex  min-h-screen ">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b-8 border-border/20 bg-background/80 px-4 backdrop-blur lg:px-6">
            {/* Student welcome section */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">
                  Welcome back, {user.full_name?.split(" ")[0]} 👋
                </p>

                <p className="text-xs text-muted-foreground">
                  Ready for the today's work.
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </Button>
              <Profile role={user.role} image={user?.image_url} />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
