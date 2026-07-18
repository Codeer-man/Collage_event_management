import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../../lib/type";
import { useAuthStore } from "../../store/auth.store";
import CommonLoader from "../common/loader";
import { toast } from "sonner";

type RoleGuard = {
  allow: UserRole[];
};

export default function RoleGuard({ allow }: RoleGuard) {
  const { booting, status, user } = useAuthStore();

  if (!booting || status === "loading") return <CommonLoader />;

  if (!user) {
    return (
      <div>
        {toast.warning(`Please Login to continue`)}
        <Navigate to={"/"} replace />
      </div>
    );
  }

  if (!allow.includes(user.role)) {
    return (
      <div>
        {toast.warning(`Only ${allow} are allowd in this paeg`)}
        <Navigate to={"/"} replace />
      </div>
    );
  }

  return <Outlet />;
}
