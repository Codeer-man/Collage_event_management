import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Plus,
  Search,
  Pencil,
  Users,
  LoaderCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { useLocationHook } from "../../feature/administrative/location/uselocation";
import { uselocationStore } from "../../feature/administrative/location/store";

export default function Location() {
  const { location, form, updateForm, handleSubmit, submitForm, editingId } =
    useLocationHook();
  const loadLocation = uselocationStore((state) => state.loadLocation);

  useEffect(() => {
    void loadLocation();
  }, [loadLocation]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredLocations = useMemo(() => {
    return (location ?? []).filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [location, search]);

  function openCreate() {
    handleSubmit();
    setOpen(true);
  }

  function openEdit(id: string) {
    handleSubmit(id);
    setOpen(true);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setSubmitting(true);
      await submitForm();
      loadLocation();
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen space-y-6  p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl  p-3 text-blue-700">
            <MapPin size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Locations
            </h1>
            <p className="text-sm text-slate-500">
              Manage venues available for college events.
            </p>
          </div>
        </div>

        <Button onClick={openCreate} className="gap-2">
          <Plus size={18} />
          Add Location
        </Button>
      </div>

      {/* Locations table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">All Locations</CardTitle>

          <div className="relative mt-3">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search locations..."
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-slate-500">
                  <th className="px-3 py-3 font-medium">Location</th>
                  <th className="px-3 py-3 font-medium">Capacity</th>
                  <th className="px-3 py-3 font-medium">Availability</th>
                  <th className="px-3 py-3 font-medium">Description</th>
                  <th className="px-3 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLocations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3 font-medium text-slate-800">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                          <MapPin size={18} />
                        </div>
                        {item.name}
                      </div>
                    </td>

                    <td className="px-3 py-4 text-slate-600">
                      <span className="flex items-center gap-2">
                        <Users size={16} />
                        {item.capacity}
                      </span>
                    </td>

                    <td className="px-3 py-4">
                      <Badge
                        variant="outline"
                        className={
                          item.is_available
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }
                      >
                        {item.is_available ? "Available" : "Unavailable"}
                      </Badge>
                    </td>

                    <td className="max-w-xs px-3 py-4 text-slate-500">
                      <p className="line-clamp-2">
                        {item.description || "No description"}
                      </p>
                    </td>

                    <td className="px-3 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(item.id)}
                        className="gap-2"
                      >
                        <Pencil size={15} />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}

                {filteredLocations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <MapPin
                        size={30}
                        className="mx-auto mb-3 text-slate-300"
                      />
                      <p className="font-medium text-slate-700">
                        No locations found
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search or create a location.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Showing {filteredLocations.length} of {location?.length ?? 0}{" "}
            locations
          </p>
        </CardContent>
      </Card>

      {/* Create / Update dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Update Location" : "Create Location"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the details of this location."
                : "Add a venue for college events."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Location name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="e.g. Main Auditorium"
                required
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min={1}
                value={form.capacity || ""}
                onChange={(e) =>
                  updateForm(
                    "capacity",
                    e.target.value === "" ? 0 : Number(e.target.value),
                  )
                }
                placeholder="Maximum number of people"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description ?? ""}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Describe this location (optional)"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-1">
                <Label htmlFor="availability">Location available</Label>
                <p className="text-xs text-slate-500">
                  Allow this location to be selected for new events.
                </p>
              </div>

              <Switch
                id="availability"
                checked={form.is_available ?? true}
                onCheckedChange={(checked) =>
                  updateForm("is_available", checked)
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <LoaderCircle className="mr-2 animate-spin" size={16} />
                )}
                {editingId ? "Save Changes" : "Create Location"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
