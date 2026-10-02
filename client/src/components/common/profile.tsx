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
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-linear-to-r from-primary/90 via-primary to-primary/70" />

          <CardContent className="relative px-6 pb-6">
            <div className="-mt-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={user.image_url} alt={user.full_name} />
                  <AvatarFallback className="text-2xl font-semibold">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                      {user.full_name}
                    </h1>

                    {user.is_email_verified && (
                      <Badge variant="secondary" className="gap-1">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Student • College Event Management System
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account status */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-full bg-primary/10 p-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <p className="font-semibold text-green-600">Active</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-full bg-primary/10 p-3">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Student Approval
                </p>

                <p className="font-semibold text-green-600">Approved</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>

                <p className="font-semibold text-green-600">Verified</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 sm:grid-cols-2">
            <ProfileItem
              icon={<UserRound className="h-4 w-4" />}
              label="Full Name"
              value={user.full_name}
            />

            <ProfileItem
              icon={<Mail className="h-4 w-4" />}
              label="Email Address"
              value={user.email}
            />

            <ProfileItem
              icon={<Building2 className="h-4 w-4" />}
              label="Faculty Id"
              value={user.faculty}
            />

            <ProfileItem
              icon={<GraduationCap className="h-4 w-4" />}
              label="Role"
              value={user.role}
            />
          </CardContent>
        </Card>

        {/* Student ID */}
        <Card>
          <CardHeader>
            <CardTitle>Student Account</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Student ID
              </p>

              <p className="break-all font-mono text-sm">{user.id}</p>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md bg-muted p-2">{icon}</div>

      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 wrap-words font-medium">{value}</p>
      </div>
    </div>
  );
}
