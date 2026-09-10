import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";

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
import { useState } from "react";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-xl px-4">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden rounded-3xl border-border/60 p-0 shadow-2xl sm:max-w-md">
        {/* Header */}
        <div className="relative overflow-hidden border-b bg-muted/30 px-7 py-7">
          {/* Skiper-style decorative elements */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />

          <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>

            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-3xl font-semibold tracking-tight">
                Welcome back
              </DialogTitle>

              <p className="text-sm leading-6 text-muted-foreground">
                Sign in to continue your CEMS journey.
              </p>
            </DialogHeader>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
        >
          <div className="space-y-5 px-7 py-7">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="login-email">Email Address</Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={login.email}
                  onChange={(e) =>
                    updateField(setLogin, "email", e.target.value)
                  }
                  className="h-11 rounded-xl pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>

                <button
                  type="button"
                  className="text-xs font-medium text-primary transition-colors hover:text-primary/80 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={login.password}
                  onChange={(e) =>
                    updateField(setLogin, "password", e.target.value)
                  }
                  className="h-11 rounded-xl pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={saving}
              className="
              h-11
              w-full
              rounded-xl
              font-semibold
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-md
              active:translate-y-0
            "
            >
              {saving ? "Signing In..." : "Sign In"}
            </Button>

            {/* Security */}
            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
              <LockKeyhole className="h-3.5 w-3.5" />
              Secure CEMS login
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
