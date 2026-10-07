import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { apiPut } from "../../lib/api";

export default function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await apiPut("/auth/forget-pwd", { token, password });
      setOpen(false);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Password</DialogTitle>

            <DialogDescription>
              Enter your new password below to reset your account password.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>

              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
