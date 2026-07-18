import { Button } from "../../components/ui/button";
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
      <DialogTrigger asChild>
        <Button variant="ghost">Login</Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden rounded-3xl border p-0 sm:max-w-md">
        {/* Top Section */}
        <div className="bg-primary px-8 py-8 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back 👋</h2>

          <p className="mt-2 text-sm text-primary-foreground/80">
            Sign in to continue shopping.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 px-6 py-8 sm:px-8">
          <DialogHeader className="hidden">
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={login.email}
              onChange={(e) => updateField(setLogin, "email", e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>

              <button
                type="button"
                className="text-xs text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={login.password}
              onChange={(e) =>
                updateField(setLogin, "password", e.target.value)
              }
              className="h-11"
            />
          </div>

          <Button
            onClick={submitLogin}
            disabled={saving}
            className="h-11 w-full rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {saving ? "Signing In..." : "Sign In"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">
                Secure Login
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
