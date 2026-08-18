import DesktopNavBar from "../../components/common/Desktop-navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
  return (
    <div>
      <DesktopNavBar />
      <Outlet />
    </div>
  );
}
