import { useAuthStore } from "../../store/auth.store";
import CommonLoader from "../common/loader";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedLayout() {
  const { status, user, booting } = useAuthStore();

  // loading
  if (!booting || status === "loading") return <CommonLoader />;

  // if not authenticated
  if (!user) {
    return (
      <div>
        {toast.warning(`Please Login to continue`)}
        <Navigate to={"/"} replace />
      </div>
    );
  }
  console.log(user);

  // if email not verified
  if (user.role === "student" && user.is_email_verified === false) {
    return (
      <div>
        {toast.warning("please verify your email", {
          description: "A email has already been send to your gmail",
        })}
        <Navigate to={"/"} replace />
      </div>
    );
  }

  // if not approved as a student
  if (user.role === "student" && user.is_approved_student === false) {
    return (
      <div>
        {toast.warning("Your account is still not verified", {
          description: "A admin must give you access to use the website",
        })}
        <Navigate to={"/"} replace />
      </div>
    );
  }

  return <Outlet />;
}
