import { useState } from "react";
import type { locationForm } from "./types";
import { uselocationStore } from "./store";
import { toast } from "sonner";
import { addLocation, updateLocation } from "./api";

const initialState: locationForm = {
  name: "",
  capacity: 0,
  description: "",
  is_available: true,
};

export function useLocationHook() {
  const [form, setForm] = useState<locationForm>(initialState);
  const [editingId, setEditingId] = useState("");

  const location = uselocationStore((state) => state.location);

  function updateForm<K extends keyof locationForm>(
    key: K,
    value: locationForm[K],
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetForm() {
    setForm(initialState);
  }

  function handleSubmit(id?: string) {
    if (!id) {
      resetForm();
      return;
    }
    setEditingId(id);
    const findLocation = location?.find((loc) => loc.id === id);

    if (!findLocation) {
      toast.info("select a locatoin");
      return;
    }

    setForm({
      name: findLocation.name,
      capacity: findLocation.capacity,
      description: findLocation.description ?? "",
      is_available: findLocation.is_available,
    });
  }

  async function submitForm() {
    try {
      if (editingId) {
        await updateLocation(form, editingId);
        resetForm();
        toast.success("Location updated");
      } else {
        await addLocation(form);
        resetForm();
        toast.success("Location add successfully");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    }
  }

  return {
    form,
    setForm,
    updateForm,
    handleSubmit,
    resetForm,
    location,
    submitForm,
    editingId,
  };
}
