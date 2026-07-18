import { RouterProvider } from "react-router-dom";
import { route } from "./layout";
import { useBootStrapAuth } from "./feature/auth/useBootStrapAuth";
import { useAuthStore } from "./store/auth.store";
import CommonLoader from "./components/common/loader";

export default function () {
  const { status } = useAuthStore();

  useBootStrapAuth();
  if (status === "loading") {
    return <CommonLoader />;
  }

  return <RouterProvider router={route} />;
}
