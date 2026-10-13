import {
  BadgeCheck,
  Building2,
  GraduationCap,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import type { AppUser } from "../../lib/type";

export default function Profile({ user }: { user: AppUser }) {
  const initials =
    user.full_name
      ?.trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ST";
  const accountApproved = user.role !== "student" || user.is_approved_student;
  const statuses = [
    {
      label: "Account access",
      value: accountApproved ? "Approved" : "Awaiting approval",
      ok: accountApproved,
      icon: ShieldCheck,
    },
    {
      label: "Student approval",
      value:
        user.role !== "student"
          ? "Not applicable"
          : user.is_approved_student
            ? "Approved"
            : "Pending",
      ok: user.role !== "student" || user.is_approved_student,
      icon: GraduationCap,
    },
    {
      label: "Email address",
      value: user.is_email_verified ? "Verified" : "Not verified",
      ok: user.is_email_verified,
      icon: Mail,
    },
  ];

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 sm:py-8 xl:px-10">
      <div className="page-wrap space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Your account
          </p>
          <h1 className="mt-2 text-3xl font-semibold">My profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review your personal information and account status.
          </p>
        </div>

        <Card className="overflow-hidden rounded-2xl border-border shadow-sm">
          <div className="h-28 bg-gradient-to-r from-[#dce7dd] via-[#eaf0e6] to-[#f2efe1] dark:from-[#33483a] dark:via-[#2c3b30] dark:to-[#393d2e]" />
          <CardContent className="relative px-5 pb-6 sm:px-7">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end">
              <Avatar className="h-24 w-24 border-4 border-card shadow-sm sm:h-28 sm:w-28">
                <AvatarImage
                  src={user.image_url || undefined}
                  alt={user.full_name}
                />
                <AvatarFallback className="bg-accent text-xl font-semibold text-accent-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold">{user.full_name}</h2>
                  {user.is_email_verified && (
                    <Badge variant="secondary" className="gap-1 rounded-full">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified email
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.role === "administrative"
                    ? "College administrator"
                    : user.role === "admin"
                      ? "Faculty administrator"
                      : user.role === "organizer"
                        ? "Event organizer"
                        : "Student"}{" "}
                  · College Event Management System
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {statuses.map(({ label, value, ok, icon: Icon }) => (
            <Card key={label} className="rounded-2xl border-border shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p
                    className={`mt-1 text-sm font-semibold ${ok ? "text-primary" : "text-amber-700 dark:text-amber-300"}`}
                  >
                    {value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="h-5 w-5 text-primary" /> Personal
              information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
            <ProfileItem
              icon={<UserRound className="h-4 w-4" />}
              label="Full name"
              value={user.full_name || "Not provided"}
            />
            <ProfileItem
              icon={<Mail className="h-4 w-4" />}
              label="Email address"
              value={user.email || "Not provided"}
            />
            <ProfileItem
              icon={<Building2 className="h-4 w-4" />}
              label="Faculty ID"
              value={user.faculty || "Not assigned"}
            />
            <ProfileItem
              icon={<GraduationCap className="h-4 w-4" />}
              label="Account role"
              value={user.role}
              capitalize
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="px-5 pb-2 pt-5 sm:px-6">
            <CardTitle className="text-lg">Account identifier</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Student / user ID
              </p>
              <p className="mt-2 break-all font-mono text-sm">{user.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
  capitalize = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p
          className={`mt-1 break-words text-sm font-medium ${capitalize ? "capitalize" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
