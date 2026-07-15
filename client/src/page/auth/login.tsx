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
    <div>
      <Dialog open={open} onOpenChange={setDialogOpen}>
        <DialogTrigger className={"cursor-pointer font-semibold"}>
          LogIn
        </DialogTrigger>
        <DialogContent className=" max-h-[90vh]  overflow-auto border-border bg-background sm:max-w-xl ">
          <DialogHeader>
            <DialogTitle
              className={
                "text-2xl font-semibold text-secondary-foreground mx-auto"
              }
            >
              Welcome Back, login to contiue
            </DialogTitle>
          </DialogHeader>
          <div className=" space-y-5">
            <div className="flex flex-col gap-3 max-w-full">
              <Label>Email</Label>
              <Input
                className=" rounded-sm bg-secondary"
                type="email"
                value={login.email}
                onChange={(e) => updateField(setLogin, "email", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 max-w-full">
              <Label>Password</Label>
              <Input
                type="password"
                className=" rounded-sm"
                value={login.password}
                onChange={(e) =>
                  updateField(setLogin, "password", e.target.value)
                }
              />
            </div>
          </div>
          <Button onClick={submitLogin}>
            {saving ? "Loggin in..." : "Login"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
