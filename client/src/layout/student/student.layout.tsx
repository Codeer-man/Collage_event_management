import { Outlet, useNavigate } from "react-router-dom";
import CommonLoader from "../../components/common/loader";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";
import { toast } from "sonner";
import Profile from "../../components/common/profileIcons";
import StudentSidebar from "../../components/student/sidebar";

export default function StudentLayout() {
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
        <StudentSidebar />
        <div className="flex min-w-0 flex-1 flex-col ">
          <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b-8 border-border/20 px-4 backdrop-blur lg:px-6">
            <div className="ml-auto flex  items-center gap-2 ">
              {/* <UserButton /> */}
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
