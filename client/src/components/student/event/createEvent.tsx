import { CalendarDays, ImagePlus, MapPin, Phone, Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import { Checkbox } from "../../ui/checkbox";
import type { allFaculty } from "../../../feature/auth/type";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import type {
  CreateEventFormData,
  location,
} from "../../../feature/students/type";

type CreateEventProps = {
  onSubmit: (data: CreateEventFormData) => void;
  loading?: boolean;
  faculties: allFaculty;
  location: location[];
};

export default function CreateEvent({
  onSubmit,
  loading = false,
  faculties,
  location,
}: CreateEventProps) {
  const [form, setForm] = useState<CreateEventFormData>({
    title: "",
    description: "",
    location_id: "",
    location_type: "internal",
    event_date: "",
    end_at: "",
    registration_deadline: "",
    entry_fee: 0,
    contact: 0,
    max_participants: 100,
    isTeamEvent: false,
    file: null,
    faculty: [],
  });

  const [selectedFacultyIds, setSelectedFacultyIds] = useState<string[]>([]);

  function updateField<K extends keyof CreateEventFormData>(
    field: K,
    value: CreateEventFormData[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleLocationTypeChange(value: "internal" | "external") {
    setForm((prev) => ({
      ...prev,
      location_type: value,
      location_id: "",
      location_name: "",
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data: CreateEventFormData = {
      ...form,
      location_id:
        form.location_type === "internal" ? form.location_id : undefined,
      location_name:
        form.location_type === "external" ? form.location_name : undefined,
      faculty: selectedFacultyIds,
    };

    onSubmit(data);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-2xl font-semibold">Create Event</CardTitle>

          <p className="text-sm text-muted-foreground">
            Create an event and provide the necessary information for
            participants.
          </p>
        </CardHeader>

        <CardContent className="p-5 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* =====================================================
                BASIC INFORMATION
            ====================================================== */}
            <section className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Event Information</h2>

                <p className="text-sm text-muted-foreground">
                  Provide the basic details about your event.
                </p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Event Title <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                  className="h-11 rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>

                <Textarea
                  id="description"
                  placeholder="Describe your event..."
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                  className="min-h-32 resize-none rounded-xl"
                />

                <p className="text-xs text-muted-foreground">
                  Provide information about the event, activities, requirements,
                  and anything participants should know.
                </p>
              </div>

              {/* Location type */}
              <div className="space-y-3">
                <Label>Where will the event take place?</Label>

                <RadioGroup
                  value={form.location_type}
                  onValueChange={handleLocationTypeChange}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="internal" id="internal" />
                    <Label htmlFor="internal">Inside college</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="external" id="external" />
                    <Label htmlFor="external">Outside college</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Location + Image */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* Location */}

                {/* Location input */}
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-destructive">*</span>
                  </Label>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    {form.location_type === "internal" ? (
                      <select
                        id="location"
                        value={form.location_id ?? ""}
                        onChange={(e) =>
                          updateField("location_id", e.target.value)
                        }
                        required
                        className="h-11 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-sm"
                      >
                        <option value="" disabled>
                          Select a college venue
                        </option>

                        {location.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        id="location"
                        placeholder="Enter external venue name"
                        value={form.location_name ?? ""}
                        onChange={(e) =>
                          updateField("location_name", e.target.value)
                        }
                        required
                        className="h-11 rounded-xl pl-9"
                      />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {form.location_type === "internal"
                      ? "Choose an available college venue."
                      : "Enter the name of the external venue."}
                  </p>
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label htmlFor="event-image">Event Image</Label>

                  <label
                    htmlFor="event-image"
                    className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 text-sm text-muted-foreground transition hover:bg-muted"
                  >
                    <ImagePlus className="h-4 w-4 shrink-0" />

                    <span className="truncate">
                      {form.file?.name || "Choose event image"}
                    </span>

                    <Input
                      id="event-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        updateField("file", e.target.files?.[0] ?? null)
                      }
                    />
                  </label>

                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or WEBP recommended.
                  </p>
                </div>
              </div>
            </section>

            {/* DATE & REGISTRATION */}

            <section className="space-y-5 border-t pt-7">
              <div>
                <h2 className="text-lg font-semibold">
                  Schedule & Registration
                </h2>

                <p className="text-sm text-muted-foreground">
                  Set when your event takes place and when registration closes.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {/* Event Date */}
                <div className="space-y-2">
                  <Label htmlFor="event-date">
                    Event Date & Time{" "}
                    <span className="text-destructive">*</span>
                  </Label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="event-date"
                      type="datetime-local"
                      value={form.event_date}
                      onChange={(e) =>
                        updateField("event_date", e.target.value)
                      }
                      required
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                {/* Event End Date */}
                <div className="space-y-2">
                  <Label htmlFor="end-at">
                    Event End Date <span className="text-destructive">*</span>
                  </Label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="end-at"
                      type="datetime-local"
                      value={form.end_at}
                      min={form.event_date || undefined}
                      onChange={(e) => updateField("end_at", e.target.value)}
                      required
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                {/* Registration Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="registration-deadline">
                    Registration Deadline{" "}
                    <span className="text-destructive">*</span>
                  </Label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="registration-deadline"
                      type="datetime-local"
                      value={form.registration_deadline}
                      onChange={(e) =>
                        updateField("registration_deadline", e.target.value)
                      }
                      required
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* EVENT SETTINGS */}

            <section className="space-y-5 border-t pt-7">
              <div>
                <h2 className="text-lg font-semibold">Event Settings</h2>

                <p className="text-sm text-muted-foreground">
                  Configure participation and contact information.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Entry Fee */}
                <div className="space-y-2">
                  <Label htmlFor="entry-fee">Entry Fee</Label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
                      Nrs
                    </div>

                    <Input
                      id="entry-fee"
                      type="number"
                      min={0}
                      placeholder="0"
                      value={form.entry_fee || ""}
                      onChange={(e) =>
                        updateField("entry_fee", Number(e.target.value))
                      }
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <Label htmlFor="contact">
                    Contact Number <span className="text-destructive">*</span>
                  </Label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="contact"
                      type="tel"
                      placeholder="98XXXXXXXX"
                      value={form.contact || ""}
                      onChange={(e) =>
                        updateField("contact", Number(e.target.value))
                      }
                      required
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>

                {/* Max Participants */}
                <div className="space-y-2">
                  <Label htmlFor="max-participants">Maximum Participants</Label>

                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="max-participants"
                      type="number"
                      min={1}
                      placeholder="100"
                      value={form.max_participants || ""}
                      onChange={(e) =>
                        updateField("max_participants", Number(e.target.value))
                      }
                      className="h-11 rounded-xl pl-9"
                    />
                  </div>
                </div>
              </div>

              {/* Team Event */}
              <div className="flex items-center justify-between gap-4">
                {/* Team Event */}
                <div className="flex flex-1 items-center justify-between rounded-xl border p-4">
                  <div>
                    <Label className="font-medium">Team Event</Label>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Allow participants to register as teams.
                    </p>
                  </div>

                  <Switch
                    checked={form.isTeamEvent}
                    onCheckedChange={(checked) =>
                      updateField("isTeamEvent", checked)
                    }
                  />
                </div>

                {/* Faculties */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-48">
                      {selectedFacultyIds.length
                        ? `${selectedFacultyIds.length} selected`
                        : "Select Faculties"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-56 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mb-1"
                      onClick={() =>
                        setSelectedFacultyIds(
                          selectedFacultyIds.length === faculties.faculty.length
                            ? []
                            : faculties.faculty.map((f) => f.id),
                        )
                      }
                    >
                      {selectedFacultyIds.length === faculties.faculty.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>

                    {faculties.faculty.map((faculty) => (
                      <label
                        key={faculty.id}
                        className="flex items-center gap-2 p-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedFacultyIds.includes(faculty.id)}
                          onCheckedChange={(checked) =>
                            setSelectedFacultyIds((prev) =>
                              checked
                                ? [...prev, faculty.id]
                                : prev.filter((id) => id !== faculty.id),
                            )
                          }
                        />
                        {faculty.faculty_name}
                      </label>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </section>

            {/* =====================================================
                SUBMIT
            ====================================================== */}
            <div className="flex flex-col-reverse gap-3 border-t pt-7 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl sm:min-w-32"
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 rounded-xl sm:min-w-40"
              >
                {loading ? "Creating Event..." : "Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
