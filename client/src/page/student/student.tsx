import CommonLoader from "../../components/common/loader";
import Profile from "../../components/common/profile";
import { useAuthStore } from "../../store/auth.store";

export default function MyProfile() {
  const { user } = useAuthStore();

  if (!user) {
    return <CommonLoader />;
  }

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
