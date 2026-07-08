export type role = "administrative" | "admin" | "student" | "organizer";

export type uuid = string & { readonly __brand: unique symbol };
