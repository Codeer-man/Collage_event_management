import { Button } from "@base-ui/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import useAuthForm from "../../feature/auth/use-auth-form";

export default function Login() {
  const {
    open,
    setDialogOpen,
    updateField,
    setLogin,
    submitLogin,
    saving,
    login,
  } = useAuthForm();

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogTrigger className=" rounded-md  px-3 py-2 font-medium transition-colors hover:bg-primary  hover:text-primary-foreground cursor-pointer">
        Login
      </DialogTrigger>

      <DialogContent className="  sm:max-w-2xl rounded-2xl border border-border bg-background p-6 shadow-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome Back 👋
          </DialogTitle>

          <p className="text-center text-sm text-muted-foreground">
            Sign in to continue to your account.
          </p>
        </DialogHeader>

        <div className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={(e) => updateField(setLogin, "email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={(e) =>
                updateField(setLogin, "password", e.target.value)
              }
            />
          </div>

          <Button
            onClick={submitLogin}
            disabled={saving}
            className=" mt-6 w-full rounded-lg   font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
          >
            {saving ? "Logging in..." : "Login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
