import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import useAuthForm from "../../feature/auth/use-auth-form";

function dashBoardRoute(role: string) {
  const path = window.location.pathname;

  if (path !== `/${role}`) {
    return `/${role}`;
  }

  return path;
}

export default function Profile({
  image,
  role,
}: {
  image: string;
  role: string;
}) {
  const { logout } = useAuthForm();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
        >
          <img
            src={image}
            alt="Profile pic"
            className="rounded-full w-8 h-8 object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to={dashBoardRoute(role)} className="w-full cursor-pointer">
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/" className="w-full cursor-pointer">
            Home
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
