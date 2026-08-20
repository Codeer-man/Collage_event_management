import {
  CalendarDays,
  Eye,
  EyeOff,
  ImagePlus,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
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
import { useState } from "react";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setDialogOpen(isOpen);

        if (isOpen) fetchFaculty();
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-xl px-5">Sign Up</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95vh] overflow-y-auto rounded-3xl p-0 sm:max-w-2xl">
        {/* Header */}
        <div className="border-b bg-muted/30 px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold">Create your account</p>
              <p className="text-xs text-muted-foreground">
                Join the CEMS community
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitRegister();
          }}
          className="space-y-5 px-6 py-6 sm:px-7"
        >
          {/* Name + Faculty */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" icon={<UserRound />}>
              <Input
                className="h-10 rounded-xl pl-9"
                placeholder="Hari Bahadur Shyam"
                value={register.full_name}
                onChange={(e) =>
                  updateField(setRegister, "full_name", e.target.value)
                }
              />
            </Field>

            <Field label="Faculty" icon={<CalendarDays />}>
              <Select
                value={register.faculty_id}
                onValueChange={(value) =>
                  updateField(setRegister, "faculty_id", value)
                }
              >
                <SelectTrigger className="h-10 rounded-xl pl-9">
                  <SelectValue placeholder="Select faculty" />
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
            </Field>
          </div>

          {/* Email + Password */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" icon={<Mail />}>
              <Input
                type="email"
                className="h-10 rounded-xl pl-9"
                placeholder="you@example.com"
                value={register.email}
                onChange={(e) =>
                  updateField(setRegister, "email", e.target.value)
                }
              />
            </Field>

            <Field label="Password" icon={<LockKeyhole />}>
              <Input
                type={showPassword ? "text" : "password"}
                className="h-10 rounded-xl pl-9 pr-10"
                placeholder="••••••••"
                value={register.password}
                onChange={(e) =>
                  updateField(setRegister, "password", e.target.value)
                }
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
            </Field>
          </div>

          {/* Contact + Image */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Contact Number" icon={<Phone />}>
              <Input
                type="tel"
                className="h-10 rounded-xl pl-9"
                placeholder="98XXXXXXXX"
                value={register.contact_number}
                onChange={(e) =>
                  updateField(setRegister, "contact_number", e.target.value)
                }
              />
            </Field>

            <div className="space-y-2">
              <Label className="text-sm">Profile Image</Label>

              <label
                htmlFor="image"
                className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm text-muted-foreground transition hover:bg-muted"
              >
                <ImagePlus className="h-4 w-4" />

                <span className="truncate">
                  {register.file?.name || "Choose image"}
                </span>

                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    updateField(
                      setRegister,
                      "file",
                      e.target.files?.[0] ?? null,
                    )
                  }
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={saving}
            className="h-11 w-full rounded-xl font-semibold"
          >
            {saving ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your account will be reviewed before student access is approved.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>

        {children}
      </div>
    </div>
  );
}
