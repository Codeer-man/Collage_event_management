import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import useAuthForm from "../../feature/auth/use-auth-form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";

export default function SignUp() {
  const {
    register,
    faculty,
    saving,
    setRegister,
    updateField,
    submitRegister,
    fetchFaculty,
    open,
    setDialogOpen,
  } = useAuthForm();

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setDialogOpen(isOpen);

          if (isOpen) {
            fetchFaculty();
          }
        }}
      >
        <DialogTrigger className=" rounded-md  px-3 py-2 font-medium transition-colors hover:bg-primary  hover:text-primary-foreground cursor-pointer">
          Sign Up
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl rounded-xl p-6">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-3xl font-bold tracking-tight text-foreground">
              Create Your Account
            </DialogTitle>

            <p className="text-sm text-muted-foreground">
              Join the College Event Management System.
            </p>
          </DialogHeader>

          <div className="  mt-6 rounded-xl border border-border bg-secondary/40 p-6 backdrop-blur-sm">
            {/* Row 1 */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={register.full_name}
                  onChange={(e) =>
                    updateField(setRegister, "full_name", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Faculty</Label>

                <Select
                  value={register.faculty_id}
                  onValueChange={(value) =>
                    updateField(setRegister, "faculty_id", value)
                  }
                >
                  <SelectTrigger className=" bg-background transition-colors hover:border-primary">
                    <SelectValue placeholder="Select Faculty" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {faculty?.faculty.map((fac) => (
                        <SelectItem key={fac.id} value={fac.id}>
                          {fac.faculty_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={register.email}
                  onChange={(e) =>
                    updateField(setRegister, "email", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={register.password}
                  onChange={(e) =>
                    updateField(setRegister, "password", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>

                <Input
                  id="contact"
                  type="tel"
                  placeholder="98XXXXXXXX"
                  value={register.contact_number}
                  onChange={(e) =>
                    updateField(setRegister, "contact_number", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>

                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    updateField(
                      setRegister,
                      "file",
                      e.target.files?.[0] ?? null,
                    )
                  }
                />
              </div>
            </div>

            <Button
              className=" mt-6 w-full rounded-lg   font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              onClick={submitRegister}
              disabled={saving}
            >
              {saving ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
