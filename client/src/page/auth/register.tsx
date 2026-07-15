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
        <DialogTrigger className={"cursor-pointer font-semibold"}>
          SignUp{" "}
        </DialogTrigger>
        <DialogContent className=" max-h-[90vh]  overflow-auto border-border bg-background sm:max-w-3xl ">
          <DialogHeader>
            <DialogTitle
              className={
                "text-2xl font-semibold text-secondary-foreground mx-auto"
              }
            >
              Create Your Account
            </DialogTitle>
          </DialogHeader>
          <div className=" grid grid-6">
            <div className=" grid  gap-4 md:grid-cols-2">
              {/* full name */}
              <div className=" space-y-3">
                <Label>Full Name</Label>
                <Input
                  value={register.full_name}
                  onChange={(e) =>
                    updateField(setRegister, "full_name", e.target.value)
                  }
                  placeholder="Full name"
                />
              </div>
              {/* faculty */}
              <div className=" space-y-3 ">
                <Label>Faculty</Label>
                <Select
                  value={register.faculty_id}
                  onValueChange={(value) =>
                    updateField(setRegister, "faculty_id", value)
                  }
                >
                  <SelectTrigger>
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
            <div className=" grid  gap-4 md:grid-cols-2">
              <div className=" space-y-3">
                {/* email */}
                <Label>Email</Label>
                <Input
                  value={register.email}
                  type="email"
                  onChange={(e) =>
                    updateField(setRegister, "email", e.target.value)
                  }
                  placeholder="exampl@gmail.com"
                />
              </div>
              <div className=" space-y-3">
                <Label>Password</Label>
                <Input
                  value={register.password}
                  type="password"
                  onChange={(e) =>
                    updateField(setRegister, "password", e.target.value)
                  }
                  placeholder="Password"
                />
              </div>
            </div>
            <div className=" grid  gap-4 md:grid-cols-2 mt-3">
              <div className=" space-y-3">
                {/* email */}
                <Label>Contact Number</Label>
                <Input
                  value={register.contact_number}
                  type="tel"
                  onChange={(e) =>
                    updateField(setRegister, "contact_number", e.target.value)
                  }
                  placeholder="9876543219"
                />
              </div>
              <div className=" space-y-3">
                <Label>Image</Label>
                <Input
                  type="file"
                  accept="images/*"
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
          </div>

          <Button
            className={"cursor-pointer"}
            variant={"default"}
            onClick={submitRegister}
            disabled={saving}
          >
            {saving ? "submiting.." : "submit"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
