import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
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

import useAuthForm from "../../feature/auth/use-auth-form";

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
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setDialogOpen(isOpen);

        if (isOpen) {
          fetchFaculty();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Sign Up</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl p-0 sm:max-w-lg lg:max-w-2xl">
        {/* Header */}
        <div className="bg-primary px-8 py-8 text-center text-primary-foreground">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-3xl font-bold">
              Create Account
            </DialogTitle>

            <p className="text-sm text-primary-foreground/80">
              Join the College Event Management System
            </p>
          </DialogHeader>
        </div>

        {/* Form */}
        <div className="space-y-6 px-6 py-8 sm:px-8">
          {/* Name + Faculty */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>

              <Input
                id="fullName"
                className="h-11"
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
                <SelectTrigger className="h-11">
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

          {/* Email + Password */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                className="h-11"
                type="email"
                placeholder="john@example.com"
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
                className="h-11"
                type="password"
                placeholder="••••••••"
                value={register.password}
                onChange={(e) =>
                  updateField(setRegister, "password", e.target.value)
                }
              />
            </div>
          </div>

          {/* Contact + Image */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>

              <Input
                id="contact"
                className="h-11"
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
                className="h-11 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90"
                onChange={(e) =>
                  updateField(setRegister, "file", e.target.files?.[0] ?? null)
                }
              />
            </div>
          </div>

          <Button
            onClick={submitRegister}
            disabled={saving}
            className="h-11 w-full rounded-xl text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {saving ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">
                Secure Registration
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
