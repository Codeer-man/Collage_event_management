import { Mail, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { apiPost } from "../../lib/api";

type ForgetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ForgetPasswordEmail({
  open,
  onOpenChange,
}: ForgetDialogProps) {
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    try {
      await apiPost("/auth/forget-pwd/send-email", {
        email,
      });
    } finally {
      toast.success("Email has been sent.Please check your gmail");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden rounded-3xl border-border/60 p-0 shadow-2xl sm:max-w-md">
        {/* Header */}
        <div className="relative overflow-hidden border-b bg-muted/30 px-7 py-7">
          {/* Decorative background */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />

          <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative">
            {/* Icon */}
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Mail className="h-5 w-5" />
            </div>

            <DialogHeader className="space-y-2 text-left">
              <DialogTitle className="text-3xl font-semibold tracking-tight">
                Forgot your password?
              </DialogTitle>

              <p className="text-sm leading-6 text-muted-foreground">
                No worries. Enter your email address and we'll send you a link
                to reset your password.
              </p>
            </DialogHeader>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-5 px-7 py-7">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="forget-password-email">Email Address</Label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="email"
                  value={email}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl pl-10"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                We'll send the password reset link to this email address.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className=" h-11 w-full rounded-xl font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0
              "
            >
              <Send className="mr-2 h-4 w-4" />
              Send Reset Link
            </Button>

            {/* Security message */}
            <div className="flex items-center justify-center gap-2 pt-1 text-xs text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              We'll only use your email to reset your password.
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
